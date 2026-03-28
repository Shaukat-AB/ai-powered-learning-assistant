export interface AppError extends Error {
  status?: number;
}

export const newError = (message = 'Internal Server Error', status = 500) => {
  const err = new Error(message) as AppError;
  err.status = status;
  return err;
};
