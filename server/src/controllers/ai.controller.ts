import type { Response, NextFunction } from 'express';
import type { RequestWithUser } from '../lib/types.js';

import { isDocumentNameValid, newError } from '../lib/utils.js';
import { getSignedUrl, storageFileExists } from '../lib/supabase.js';

import {
  ai,
  aiGetFile,
  Chat,
  createChat,
  createFileContent,
} from '../lib/google-genai.js';

const chatMap = new Map<string, Chat>(); // keep short-term history;

export const startChat = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (typeof name !== 'string' || !isDocumentNameValid(name)) {
      throw newError('Invalid document name', 400);
    }

    const { data: exists, error } = await storageFileExists(
      name,
      req?.user?.uid
    );

    if (!exists || error) {
      throw newError(
        error?.message || 'No Document was found',
        error?.status || 404
      );
    }

    const pdfUrl = await getSignedUrl(name, req?.user?.uid);
    const fileExists = await aiGetFile(name);
    if (fileExists && !(fileExists instanceof Error)) {
      // This is ok and not a bad request
      return res.status(200).json({
        message: 'File already exists',
        success: true,
      });
    }

    const chat = createChat();
    chatMap.set(name, chat);

    const pdfBuffer = await fetch(pdfUrl).then((response) =>
      response.arrayBuffer()
    );

    const fileBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

    const file = await ai.files.upload({
      file: fileBlob,
      config: {
        name: name,
      },
    });

    // Wait for the file to be processed.
    if (file.name) {
      let getFile = await ai.files.get({ name: file.name });

      while (getFile.state === 'PROCESSING') {
        getFile = await ai.files.get({ name: file.name });
        console.log(`current file status: ${getFile.state} name:${name}`);
        console.log('File is still processing, retrying in 5 seconds');
        await new Promise((resolve) => {
          setTimeout(resolve, 5000);
        });
      }
    }

    return res.status(200).json({
      success: !!(file.uri && file.mimeType),
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to start ai chat: ', err.message);
      next(err);
    }
    return null;
  }
};

export const chat = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { prompt, name } = req.body;

    if (typeof name !== 'string' || !isDocumentNameValid(name)) {
      throw newError('Invalid document name.', 400);
    }

    const file = await aiGetFile(name);

    if (file instanceof Error) throw newError(file?.message, 404);

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
