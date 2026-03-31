import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

export const BUCKET = process.env.SUPABASE_BUCKET_NAME;

export const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? ''
);

export const storageFile = supabase.storage.from(BUCKET ?? '');

export const getStoragePath = (name: string, folder = 'public') => {
  return `${folder}/${name.endsWith('.pdf') ? name : name + '.pdf'}`;
};

export const getUrl = (name: string, folder = 'public') => {
  return storageFile.getPublicUrl(getStoragePath(name, folder)).data.publicUrl;
};

export const storageFileExists = (name: string) => {
  return storageFile.exists(getStoragePath(name));
};
