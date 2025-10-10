# Vercel Environment Variables Setup

The login is failing with "Invalid API key" error. This means the environment variables in Vercel are incorrect.

## Correct Environment Variables

Please update your Vercel environment variables with these exact values:

### VITE_SUPABASE_URL
```
https://yrzrwhihkpmjniugczka.supabase.co
```

### VITE_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyenJ3aGloa3Btam5pdWdjemthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMzc4NjYsImV4cCI6MjA3NTYxMzg2Nn0.zLOPXKGK_8L2E3a4LUEfYiNkFQZTIREZ292q4LUk4sk
```

## How to Update in Vercel

1. Go to: https://vercel.com/sproutnnn/sproutn-product/settings/environment-variables
2. Delete the existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables
3. Add new ones with the exact values above (copy from the code blocks)
4. Make sure to select all environments (Production, Preview, Development)
5. Redeploy your application

## Verification

After updating and redeploying, the console should show:
- ✅ Supabase client initializing
- 🔐 Attempting login
- 🌐 Making Supabase fetch request (should return 200, not 401)

## Important Notes

- Copy the entire key in one selection to avoid invisible characters
- Don't add quotes around the values in Vercel
- Make sure there are no spaces before or after the values
- The anon key should be exactly 208 characters long
