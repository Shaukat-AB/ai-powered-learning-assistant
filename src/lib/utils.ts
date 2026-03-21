import { clsx, type ClassValue } from 'clsx';
import type { ErrorInfo } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Logs error caught by Error boundary
export function logError(error: unknown, info: ErrorInfo) {
  console.error('Error: ', error, '\ncomponentStack: ', info.componentStack);
}
