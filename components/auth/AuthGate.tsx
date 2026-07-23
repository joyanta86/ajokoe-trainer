'use client';

import { AlertTriangle, Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

import { useAuth } from '@/components/auth/AuthProvider';

const LOGIN_PATH = '/login';

function FullScreen({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {children}
    </div>
  );
}

/**
 * Enforces required login across the whole app (client-side gating on a static
 * export). Unauthenticated users are sent to `/login`; the login page is the
 * one route reachable without a session.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const { configured, loading, user } = useAuth();
  const rawPath = usePathname();
  const router = useRouter();
  // `trailingSlash` export can yield "/login/"; normalise before comparing.
  const pathname = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
  const onLoginPage = pathname === LOGIN_PATH;

  useEffect(() => {
    if (loading || !configured) return;
    if (!user && !onLoginPage) router.replace(LOGIN_PATH);
    if (user && onLoginPage) router.replace('/');
  }, [loading, configured, user, onLoginPage, router]);

  // Supabase keys absent — tell the operator rather than lock everyone out silently.
  if (!configured) {
    return (
      <FullScreen>
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <AlertTriangle size={24} aria-hidden />
        </span>
        <h1 className="mt-4 text-xl font-semibold text-ink-900">Sign-in is not configured yet</h1>
        <p className="mt-2 max-w-md text-sm text-ink-600">
          The Supabase environment variables are missing. Set{' '}
          <code className="rounded bg-ink-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
          <code className="rounded bg-ink-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and
          rebuild. See AUTH.md for the full setup.
        </p>
      </FullScreen>
    );
  }

  if (loading) {
    return (
      <FullScreen>
        <Loader2 size={28} className="animate-spin text-brand-600" aria-hidden />
        <p className="mt-3 text-sm text-ink-500">Loading…</p>
      </FullScreen>
    );
  }

  // Redirecting (effect above) — render nothing to avoid a flash of gated content.
  if (!user && !onLoginPage) {
    return (
      <FullScreen>
        <Loader2 size={28} className="animate-spin text-brand-600" aria-hidden />
        <p className="mt-3 text-sm text-ink-500">Redirecting to sign in…</p>
      </FullScreen>
    );
  }

  return <>{children}</>;
}
