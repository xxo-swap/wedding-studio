import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const getStorageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') 
    ? path 
    : `${process.env.NEXT_PUBLIC_STORAGE_URL}/${path}`;
};