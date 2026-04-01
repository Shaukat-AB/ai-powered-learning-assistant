import { AppError } from '../lib/utils.js';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.status(err?.status || 500).json({
    success: false,
    code: err?.status || 500,
    message: err?.message || 'Internal Server Error',
  });
};
