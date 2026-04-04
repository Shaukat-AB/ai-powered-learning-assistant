import type { RequestWithUser } from '../lib/types.js';
import type { Response, NextFunction } from 'express';

import { config } from 'dotenv';

import { newError } from '../lib/utils.js';
import {
  BUCKET,
  getSignedUrl,
  getSignedUrls,
  getStoragePath,
  storageFile,
} from '../lib/supabase.js';

config();

export const getDocuments = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await storageFile.list(req?.user?.uid, {
      limit: 10,
      sortBy: { column: 'created_at', order: 'asc' },
    });

    if (error) throw newError(error.message, error.status || 400);

    const signedUrls = data.length
      ? await getSignedUrls(
          data.map((d) => d.name),
          req.user?.uid
        )
      : [];

    return res.status(200).json(
      data?.map((doc, i) => ({
        id: doc.id,
        name: doc.name.split('.')[0],
        url: signedUrls[i],
        sizeBytes: doc.metadata?.size,
        createdAt: doc.created_at,
        updatedAt: doc.updated_at,
      }))
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to get documents: ', err.message);
      next(err);
    }
    return null;
  }
};

export const uploadDocument = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const pdf = req.file;

    if (!pdf || !pdf.buffer) throw newError('File is invalid', 400);

    const name = pdf.originalname;
    const folder = req.user?.uid;

    if (!BUCKET) throw newError('Failed to load .env variables');

    const { data, error } = await storageFile.upload(
      getStoragePath(name, folder),
      pdf.buffer,
      {
        contentType: pdf.mimetype,
        upsert: false,
      }
    );

    if (error) throw newError(error.message, error.status || 400);

    const url = await getSignedUrl(name, folder);

    return res.status(200).json({
      id: data?.id,
      name: name,
      url: url,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to upload document: ', err.message);
      next(err);
    }
    return null;
  }
};

export const deleteDocument = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    if (!name || typeof name !== 'string') {
      throw newError('Invalid Document Name', 400);
    }

    const { data, error } = await storageFile.remove([
      getStoragePath(name, req?.user?.uid),
    ]);
    if (error) {
      throw newError(error.message, error.status || 400);
    }

    return res.status(200).json({
      success: true,
      document: data && { id: data[0].id, name: name },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to delete document: ', err.message);
      next(err);
    }
    return null;
  }
};
