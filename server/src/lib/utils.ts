import type { AppError } from './types.js';

import { documentNameValidater } from '@shared/utils/document.js';

export const newError = (message = 'Internal Server Error', status = 500) => {
  const err = new Error(message) as AppError;
  err.status = status;
  return err;
};

export const isDocumentNameValid = documentNameValidater.isValid;
