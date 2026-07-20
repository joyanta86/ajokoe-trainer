'use client';

import { Bookmark, BookOpen } from 'lucide-react';
import Link from 'next/link';

import { TaxiPracticeRunner } from '@/components/TaxiPracticeRunner';
import { getTaxiQuestionsByIds } from '@/data/taxi-questions';
import { useHydrated } from '@/lib/hooks';
import { useTaxiProgressStore } from '@/store/useTaxiProgressStore';

export default function TaxiBookmarksPage() {
  const hydrated = useHydrated();
  const bookmarks = useTaxiProgressStore((state) => state.bookmarks);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-ink-500">Loading your flagged questions…</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
          <Bookmark size={24} aria-hidden />
        </span>
        <h1 className="mt-4 text-xl font-semibold text-ink-900">No flagged questions yet</h1>
        <p className="mt-2 text-sm text-ink-600">
          While studying, use the flag button on any tricky question to collect it here for a focused
          review session.
        </p>
        <Link
          href="/taxi/study"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <BookOpen size={16} aria-hidden />
          Go to taxi study hub
        </Link>
      </div>
    );
  }

  return (
    <TaxiPracticeRunner
      questions={getTaxiQuestionsByIds(bookmarks)}
      title="Flagged questions"
      subtitle="The taxi questions you marked as tricky while studying"
      backHref="/taxi"
      backLabel="Back to taxi dashboard"
    />
  );
}
