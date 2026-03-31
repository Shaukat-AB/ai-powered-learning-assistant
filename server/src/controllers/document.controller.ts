import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { newError } from '../lib/utils.js';
import {
  BUCKET,
  getStoragePath,
  getUrl,
  storageFile,
} from '../lib/supabase.js';

config();

export const getDocuments = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await storageFile.list('public', {
      limit: 10,
      sortBy: { column: 'created_at', order: 'asc' },
    });

    if (error) throw newError(error.message, error.status || 400);

    return res.status(200).json(
      data?.map((doc) => ({
        id: doc.id,
        name: doc.name.split('.')[0],
        url: getUrl(doc.name),
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pdf = req.file;
  try {
    if (!pdf || !pdf.buffer) throw newError('File is invalid', 400);

    const name = pdf.originalname;
    const folder = 'public';

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

    return res.status(200).json({
      id: data?.id,
      name: name,
      url: getUrl(name, folder),
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      message: 'delete document id',
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to delete document: ', err.message);
      next(err);
    }
    return null;
  }
};
