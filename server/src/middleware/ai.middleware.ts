import type { RequestUserAndAiFile } from '../lib/types.js';
import type { Response, NextFunction } from 'express';

import { isDocumentNameValid, newError } from '../lib/utils.js';
import { getSignedUrl, storageFileExists } from '../lib/supabase.js';
import { ai, aiGetFile } from '../lib/google-genai.js';

export const aiFileContext = async (
  req: RequestUserAndAiFile,
  _res: Response,
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
      req.aiFile = fileExists;
      return next();
    }

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

    req.aiFile = file;

    return next();
  } catch (error) {
    console.error('Error aiFileUpload: ', error);
    return next(error);
  }
};
