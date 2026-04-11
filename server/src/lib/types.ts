import type { TUser } from './fire-base-admin.js';
import type { Request } from 'express';
import type { TFile } from './google-genai.js';

export type RequestWithUser = Request & { user?: TUser };
export type RequestUserAndAiFile = RequestWithUser & { aiFile?: TFile };

export interface AppError extends Error {
  status?: number;
}
