import type { Response, NextFunction } from 'express';
import type { RequestUserAndAiFile } from '../lib/types.js';

import { newError } from '../lib/utils.js';

import { Chat, createChat, createFileContent } from '../lib/google-genai.js';

const chatMap = new Map<string, Chat>(); // keep short-term history;

export const chat = async (
  req: RequestUserAndAiFile,
  res: Response,
  next: NextFunction
) => {
  try {
    const { prompt, name } = req.body;

    const file = req?.aiFile;
    if (!file) throw newError('Ai context file was not found', 404);

    let chat = chatMap.get(name);
    if (!chat) {
      chat = createChat();
      chatMap.set(name, chat);
    }

    const fileContent = createFileContent(file);

    const response = await chat.sendMessage({
      message: [prompt, fileContent],
    });

    return res.status(200).json({
      text: response.text,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to get ai response: ', err.message);
      next(err);
    }
    return null;
  }
};
