import type { RequestWithUser } from '../lib/types.js';
import type { Response, NextFunction } from 'express';

import { isDocumentNameValid, newError } from '../lib/utils.js';
import {
  aiGenerateContent,
  aiGetFile,
  aiQuizzInstruction,
  createFileContent,
} from '../lib/google-genai.js';

import {
  deleteQuizzes,
  fetchQuizzesByIdAndDocument,
  upsertAppendQuiz,
} from '../lib/supabase.js';

// Used for generating unique quiz title by avoiding used titles with fetching quizzes again.
const quizzesMap = new Map<string, [] | [{ [key: string]: unknown }]>();

export const getQuizzes = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.params;

    if (typeof name !== 'string' || !isDocumentNameValid(name)) {
      throw newError('Invalid document name.', 400);
    }
    const data = await fetchQuizzesByIdAndDocument(req.user?.uid ?? '', name);

    if (req.user?.uid) quizzesMap.set(req.user.uid, data);

    return res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to get quizzes: ', err.message);
      next(err);
    }

    return;
  }
};

export const generateQuiz = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { total, name } = req.body;

    if (typeof total !== 'number' || total < 3 || total > 100) {
      throw newError('Invalid total amount.', 400);
    }

    if (typeof name !== 'string' || !isDocumentNameValid(name)) {
      throw newError('Invalid document name.', 400);
    }

    const lastTitles = quizzesMap
      .get(req.user?.uid ?? '')
      ?.map((q) => q?.title ?? '')
      .join(',');

    const optionsPerQuizz = 4;
    const prompt = `Carefully review the document and generate - a unique title (not matching any from this list: ${lastTitles}) that reflects concepts or knowledge used in the generated questions, generate - ${total} questions, generate - ${optionsPerQuizz} options each, generate - index value of the correct answer. Ensure the output is a valid JSON object matching the provided schema`;

    const file = await aiGetFile(name);
    if (file instanceof Error) throw newError(file?.message, 404);

    const generated = await aiGenerateContent(
      [prompt, createFileContent(file)],
      {
        systemInstruction: aiQuizzInstruction,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',

        responseSchema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            questions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  question: { type: 'string' },
                  options: { type: 'array', items: { type: 'string' } },
                  correctAnswerIndex: { type: 'number' },
                  explanation: { type: 'string' },
                },
                required: [
                  'question',
                  'options',
                  'correctAnswerIndex',
                  'explanation',
                ],
              },
            },
          },

          required: ['title', 'questions'],
        },
      }
    );

    const result = await JSON.parse(generated?.text ?? '');
    const quiz =
      typeof result === 'object'
        ? {
            id: crypto.randomUUID(),
            document: name,
            createdAt: new Date().toISOString(),
            ...result,
          }
        : { questions: [] };

    if (!Array.isArray(result?.questions) || !result.questions.length) {
      throw newError('Ai failed to generate the quiz');
    }

    await upsertAppendQuiz(req.user?.uid ?? '', {
      createdAt: new Date().toISOString(),
      ...quiz,
    });

    return res.status(200).json(quiz);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to generate quiz: ', err.message);
      next(err);
    }
    return null;
  }
};

export const deleteQuiz = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;

    if (typeof id !== 'string' || !id) {
      throw newError('Invalid quiz id.', 400);
    }

    const deletedId = await deleteQuizzes(req.user?.uid ?? '', { id });

    if (!deletedId?.length) throw newError('Quiz of id was not found', 404);

    return res.status(200).json({
      success: true,
      deletedId: deletedId[0],
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to get quizzes: ', err.message);
      next(err);
    }

    return;
  }
};
