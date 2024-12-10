import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = "https://ghrmjxghxifbkhpmtcwf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdocm1qeGdoeGlmYmtocG10Y3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MzgxOTUsImV4cCI6MjA0OTQxNDE5NX0.HXHyJm5fkIiRmv3GBU5XJQy7rN6QvCFmyZbx6ccat7w";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);