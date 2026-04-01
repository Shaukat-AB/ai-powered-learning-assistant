import { Request, Response, NextFunction } from 'express';
import { newError } from '../lib/utils.js';
import { auth, TUser } from '../lib/fire-base-admin.js';

export const authorize = async (
  req: Request & { user?: TUser },
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith('Bearer ')) {
    throw newError('Unauthorized: token was not provided', 401);
  }

  try {
    const token = authorization.split('Bearer ')[1];

    req.user = await auth.verifyIdToken(token);
    return next();
  } catch (error) {
    return next(error);
  }
};
