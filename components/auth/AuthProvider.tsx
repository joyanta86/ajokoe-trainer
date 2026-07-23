'use client';

import type { Session, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { startCloudSync } from '@/lib/cloud-sync';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

interface AuthResult {
  error: string | null;
  /** True when a sign-up needs email confirmation before a session exists. */
  needsEmailConfirmation?: boolean;
}

interface AuthContextValue {
  configured: boolean;
  loading: boolean;
  session: Session | null;
  user: User | null;
  signInWithPassword: (email: string, password: string) => Promise<AuthResult>;
  signUpWithPassword: (email: string, password: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Track the auth session.
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // Start/stop cloud sync as the signed-in user changes.
  const userId = session?.user.id;
  useEffect(() => {
    if (!userId) return;
    return startCloudSync(userId);
  }, [userId]);

  const value: AuthContextValue = {
    configured: isSupabaseConfigured,
    loading,
    session,
    user: session?.user ?? null,

    signInWithPassword: async (email, password) => {
      if (!supabase) return { error: 'Authentication is not configured.' };
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error?.message ?? null };
    },

    signUpWithPassword: async (email, password) => {
      if (!supabase) return { error: 'Authentication is not configured.' };
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) return { error: error.message };
      // With email confirmation on, no session is returned until the user confirms.
      return { error: null, needsEmailConfirmation: !data.session };
    },

    signInWithGoogle: async () => {
      if (!supabase) return { error: 'Authentication is not configured.' };
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      return { error: error?.message ?? null };
    },

    signOut: async () => {
      await supabase?.auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
