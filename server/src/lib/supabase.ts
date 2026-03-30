import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

export const BUCKET = process.env.SUPABASE_BUCKET_NAME;

export const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? ''
);

export const storageFile = supabase.storage.from(BUCKET ?? '');
