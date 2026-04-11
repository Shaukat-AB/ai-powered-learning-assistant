import type { RequestWithUser } from '../lib/types.js';
import type { Response, NextFunction } from 'express';

import { newError } from '../lib/utils.js';
import { getQuizzes, storageFile } from '../lib/supabase.js';

export const getDashboradData = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error } = await storageFile.list(req?.user?.uid);

    if (error) throw newError(error.message, error.status || 400);

    const quizzes = await getQuizzes(req?.user?.uid ?? '');

    const totalDocuments = data?.length || 0;
    const totalQuizzes = quizzes?.length || 0;

    return res.status(200).json({
      success: true,
      totalDocuments,
      totalQuizzes,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to get dashboard data: ', err.message);
      next(err);
    }

    return;
  }
};
