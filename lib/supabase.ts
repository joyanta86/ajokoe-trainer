'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Browser Supabase client.
 *
 * The app is a static export, so there is no server: authentication and data
 * sync run entirely client-side against Supabase's hosted API, protected by
 * Row Level Security. Configuration comes from build-time public env vars.
 *
 * When the env vars are absent (e.g. a local build without secrets, or CI),
 * the client is `null` and the UI shows a "not configured" notice instead of
 * crashing the build — this keeps `npm run build` green without real keys.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        // Parse the OAuth redirect (tokens in the URL) automatically on load.
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    })
  : null;
