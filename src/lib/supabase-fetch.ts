/**
 * Direct Supabase REST API wrapper using fetch
 * This bypasses the Supabase JS client to avoid header issues
 */

// Clean environment variables by removing control characters and trimming
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim().replace(/[\x00-\x1F\x7F-\x9F]/g, '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim().replace(/[\x00-\x1F\x7F-\x9F]/g, '');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

interface QueryOptions {
  select?: string;
  eq?: Record<string, any>;
  single?: boolean;
}

export async function supabaseFetch<T = any>(
  table: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
  options: QueryOptions & { body?: any } = {}
): Promise<{ data: T | null; error: any }> {
  try {
    const { select = '*', eq, single = false, body } = options;

    // Build URL
    let url = `${supabaseUrl}/rest/v1/${table}?select=${select}`;

    // Add filters
    if (eq) {
      Object.entries(eq).forEach(([key, value]) => {
        url += `&${key}=eq.${value}`;
      });
    }

    // Build headers without using the Headers class
    const headers: Record<string, string> = {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    };

    if (single) {
      headers['Accept'] = 'application/vnd.pgrst.object+json';
    }

    const requestInit: RequestInit = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PATCH')) {
      requestInit.body = JSON.stringify(body);
    }

    console.log('🌐 Making Supabase fetch request:', { url, method, headers: { ...headers, apikey: '***', Authorization: 'Bearer ***' } });

    const response = await fetch(url, requestInit);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Supabase fetch error:', errorText);
      return {
        data: null,
        error: { message: errorText, status: response.status }
      };
    }

    const data = await response.json();
    console.log('✅ Supabase fetch success');

    return { data, error: null };
  } catch (error) {
    console.error('❌ Supabase fetch exception:', error);
    return {
      data: null,
      error: { message: error instanceof Error ? error.message : 'Unknown error' }
    };
  }
}
