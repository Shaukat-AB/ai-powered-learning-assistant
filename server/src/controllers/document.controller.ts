import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { newError } from '../lib/utils.js';
import { BUCKET, storageFile, supabase } from '../lib/supabase.js';

config();

export const getDocuments = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      message: 'Get documents',
    });
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

    const name = pdf.originalname.toLowerCase();
    const folder = 'public';
    const pdfPath = `${folder}/${name.endsWith('.pdf') ? name : name + '.pdf'}`;

    if (!BUCKET) throw newError('Failed to load .env variables');

    const { data, error } = await storageFile.upload(pdfPath, pdf.buffer, {
      contentType: pdf.mimetype,
      upsert: false,
    });

    if (error) throw newError(error.message, error.status || 400);

    return res.status(200).json({
      id: data?.id,
      name: name,
      path: data.path,
      url: supabase.storage.from(BUCKET).getPublicUrl(pdfPath).data.publicUrl,
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
