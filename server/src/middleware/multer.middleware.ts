import type { Request } from 'express';

import { newError } from '../lib/utils.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const fieldName = 'document';
const maxSize = 1024 * 1024; // 1mb

const pdfFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.fieldname !== fieldName) {
    return cb(newError('Unexpected fieldname!'));
  }
  if (file.mimetype !== 'application/pdf') {
    return cb(newError('Only PDF files are allowed!'));
  }

  cb(null, true);
};

export const uploadPdf = multer({
  storage: storage,
  fileFilter: pdfFilter,
  limits: { fileSize: maxSize },
}).single(fieldName);
