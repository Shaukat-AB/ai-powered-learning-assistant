import type { TUser } from './fire-base-admin.js';
import type { Request } from 'express';

export type RequestWithUser = Request & { user?: TUser };

export interface AppError extends Error {
  status?: number;
}
