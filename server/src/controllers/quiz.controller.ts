import type { RequestWithUser } from '../lib/types.js';
import type { Response, NextFunction } from 'express';

import { isDocumentNameValid, newError } from '../lib/utils.js';
import {
  aiGenerateContent,
  aiGetFile,
  aiQuizzInstruction,
  createFileContent,
} from '../lib/google-genai.js';
import { upsertAppendQuiz } from '../lib/supabase.js';

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

    const optionsPerQuizz = 4;
    const prompt = `Carefully review the document and generate - ${total} questions, generate - ${optionsPerQuizz} options each, generate - index value of the correct answer. Ensure the output is a valid JSON object matching the provided schema`;

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

          required: ['questions'],
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
