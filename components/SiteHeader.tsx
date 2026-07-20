'use client';

import { BookOpen, Bookmark, Car, ClipboardCheck, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TRACKS, trackForPathname } from '@/lib/tracks';
import { cn } from '@/lib/utils';

const NAV_ICON = {
  dashboard: LayoutDashboard,
  study: BookOpen,
  exam: ClipboardCheck,
  bookmarks: Bookmark,
} as const;

export function SiteHeader() {
  const pathname = usePathname();
  const track = trackForPathname(pathname);

  // Exam simulators are deliberately distraction-free.
  if (pathname.endsWith('/exam/run')) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-white">
            <Car size={18} aria-hidden />
          </span>
          <span>Ajokoe Trainer</span>
        </Link>

        {track ? (
          <nav aria-label="Track sections" className="order-3 flex items-center gap-1 sm:order-2">
            {track.nav.map(({ key, href, label }) => {
              const Icon = NAV_ICON[key];
              const isActive =
                href === track.basePath ? pathname === href : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-ink-100',
                  )}
                >
                  <Icon size={16} aria-hidden />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>
        ) : null}

        {/* Track switcher — the two exams are separate products sharing one app. */}
        <div
          role="group"
          aria-label="Exam track"
          className="order-2 flex rounded-lg border border-ink-200 p-0.5 sm:order-3"
        >
          {TRACKS.map((candidate) => {
            const isActive = track?.id === candidate.id;
            return (
              <Link
                key={candidate.id}
                href={candidate.basePath}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors',
                  isActive ? 'bg-brand-700 text-white' : 'text-ink-600 hover:bg-ink-100',
                )}
              >
                {candidate.shortName}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
