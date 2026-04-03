import { Request, Response, NextFunction } from 'express';

import { newError } from '../lib/utils.js';
import { auth, TUser } from '../lib/fire-base-admin.js';
import { setAuthSession } from '../lib/supabase.js';

export const authorize = async (
  req: Request & { user?: TUser },
  _res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization?.startsWith('Bearer ')) {
      throw newError('Unauthorized: token was not provided', 401);
    }
    const token = authorization.split('Bearer ')[1];

    req.user = await auth.verifyIdToken(token);
    await setAuthSession(token);

    return next();
  } catch (error) {
    console.error('Authorization Failed: ', error);
    return next(error);
  }
};
