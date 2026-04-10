import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Logs error caught by Error boundary
export function logError(error: unknown, info: React.ErrorInfo) {
  console.error('Error: ', error, '\ncomponentStack: ', info.componentStack);
}

export const documentNameValidater = {
  isValid: (name: string) => {
    return name && /^(?!-)(?!.*--)[a-z0-9-]{1,26}(?<!-)$/.test(name); // lowercase separated by - and length at most 26
  },

  validate: (name: unknown) =>
    typeof name === 'string'
      ? name
          .toLowerCase()
          .replace(/\W+|_+/g, '-') // replace all non word characters including _ with -
          .replace(/^-+|-+$/g, '') // replace - at the start or end
      : '',
};

// Quiz Results Page
export const toMinsSeconds = (seconds: number) => {
  return `${Math.floor(seconds / 60)} mins ${
    seconds - Math.floor(seconds / 60) * 60
  } seconds`;
};

export const scoreLabel = (score: number) => {
  if (score >= 100) return 'Perfect';
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Very Good';
  if (score >= 50) return 'Average';
  if (score >= 25) return 'Below Average';
  return 'Very Poor';
};

export const toStorkeCssClass = (score: number, subtle = false) => {
  switch (true) {
    case score >= 100:
      return !subtle ? 'stroke-green-500!' : 'stroke-green-500/25!';
    case score >= 90:
      return !subtle ? 'stroke-emerald-500!' : 'stroke-emerald-500/25!';
    case score >= 75:
      return !subtle ? 'stroke-lime-500!' : 'stroke-lime-500/25!';
    case score >= 50:
      return !subtle ? 'stroke-amber-500!' : 'stroke-amber-500/25!';
    case score >= 25:
      return !subtle ? 'stroke-orange-500!' : 'stroke-orange-500/25!';
    case score >= 1:
      return !subtle ? 'stroke-red-500!' : 'stroke-red-500/25!';
    default:
      return !subtle ? 'stroke-slate-500!' : 'stroke-slate-500/25!';
  }
};
