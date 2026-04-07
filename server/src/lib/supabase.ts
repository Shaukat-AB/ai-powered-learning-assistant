import { config } from 'dotenv';
import { newError } from './utils.js';
import { createClient } from '@supabase/supabase-js';

config();

const BUCKET = process.env.SUPABASE_BUCKET_NAME;
const QuizzesTableName = process.env.SUPABSE_QUIZZES_TABLE_NAME ?? '';
const signedUrlExpiresIn = 60 * 30; // 30 mins

const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SECRET_KEY ?? ''
);

const storageFile = supabase.storage.from(BUCKET ?? '');
const quizzesTable = supabase.from(QuizzesTableName);

const getStoragePath = (name: string, folder = 'public') => {
  return `${folder}/${name.endsWith('.pdf') ? name : name + '.pdf'}`;
};

const getSignedUrl = async (name: string, folder: string | undefined) => {
  const { data, error } = await storageFile.createSignedUrl(
    getStoragePath(name, folder),
    signedUrlExpiresIn
  );

  if (error) {
    throw newError(error.message, error.status || 400);
  }

  return data.signedUrl;
};

const getSignedUrls = async (names: string[], folder: string | undefined) => {
  const { data, error } = await storageFile.createSignedUrls(
    names.map((name) => getStoragePath(name, folder)),
    signedUrlExpiresIn
  );

  if (error) {
    throw newError(error.message, error.status || 400);
  }

  return data.map((d) => d.signedUrl);
};

const storageFileExists = (name: string, folder: string | undefined) => {
  return storageFile.exists(getStoragePath(name, folder));
};

const setAuthSession = (access_token: string) => {
  return supabase.auth.setSession({
    access_token,
    refresh_token: '',
  });
};

const upsertAppendQuiz = async (id: string, quiz: object) => {
  const { data, error } = await supabase.rpc('upsert_append_quiz', {
    row_id: id,
    quiz: quiz,
  });

  if (error) throw newError(error.message);
  return data;
};

const fetchQuizzesByIdAndDocument = async (
  id: string,
  documentName: string
) => {
  const { data, error } = await supabase.rpc('fetch_quizzes', {
    row_id: id,
    document_name: documentName,
  });

  if (error) throw newError(error.message);

  return data as [] | [{ [key: string]: unknown }];
};

const deleteQuizzes = async (userId: string, removable = {}) => {
  const { data, error } = await supabase.rpc('delete_quizzes', {
    row_id: userId,
    removable: removable,
  });

  if (error) throw newError(error.message);

  return data as string[];
};

export {
  BUCKET,
  storageFile,
  quizzesTable,
  upsertAppendQuiz,
  fetchQuizzesByIdAndDocument,
  deleteQuizzes,
  getStoragePath,
  setAuthSession,
  storageFileExists,
  getSignedUrls,
  getSignedUrl,
};
