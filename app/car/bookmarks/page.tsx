'use client';

import { Bookmark, BookOpen } from 'lucide-react';
import Link from 'next/link';

import { CarPracticeRunner } from "@/components/CarPracticeRunner";
import { getQuestionsByIds } from '@/data/questions';
import { useHydrated } from '@/lib/hooks';
import { useProgressStore } from '@/store/useProgressStore';

export default function BookmarksPage() {
  const hydrated = useHydrated();
  const bookmarks = useProgressStore((state) => state.bookmarks);

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
          href="/car/study"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <BookOpen size={16} aria-hidden />
          Go to study hub
        </Link>
      </div>
    );
  }

  return (
    <CarPracticeRunner
      questions={getQuestionsByIds(bookmarks)}
      title="Flagged questions"
      subtitle="The questions you marked as tricky while studying"
      backHref="/car"
      backLabel="Back to dashboard"
    />
  );
}
