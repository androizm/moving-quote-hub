import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wnuiaunbrnzyafrihkei.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndudWlhdW5icm56eWFmcmloa2VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMzgxNDcsImV4cCI6MjA0OTkxNDE0N30.3uBmPSC_NO4eqGFpG6T8xGe8Pc7OcWW_Qrm0DYcLoYU";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);