import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing environment variables:', {
    VITE_SUPABASE_URL: supabaseUrl ? 'present' : 'MISSING',
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? 'present' : 'MISSING'
  });
  throw new Error('Missing Supabase environment variables');
}

// Validate URL format
if (typeof supabaseUrl !== 'string' || !supabaseUrl.startsWith('http')) {
  console.error('Invalid Supabase URL:', supabaseUrl);
  throw new Error('Invalid Supabase URL format');
}

// Validate key format
if (typeof supabaseAnonKey !== 'string' || supabaseAnonKey.length < 20) {
  console.error('Invalid Supabase anon key');
  throw new Error('Invalid Supabase anon key format');
}

console.log('✅ Supabase client initializing with:', {
  url: supabaseUrl,
  keyPrefix: supabaseAnonKey.substring(0, 20) + '...'
});

// Create Supabase client for database operations only (no auth)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});
