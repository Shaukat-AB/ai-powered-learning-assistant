export interface AppError extends Error {
  status?: number;
}

export const newError = (message = 'Internal Server Error', status = 500) => {
  const err = new Error(message) as AppError;
  err.status = status;
  return err;
};

export const isDocumentNameValid = (name: string) => {
  return name && /^(?!-)(?!.*--)[a-z0-9-]{1,26}(?<!-)$/.test(name); // lowercase separated by - and length at most 26
};
