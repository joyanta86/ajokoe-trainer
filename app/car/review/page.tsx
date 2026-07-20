'use client';

import { Home, Target } from 'lucide-react';
import Link from 'next/link';

import { CarPracticeRunner } from "@/components/CarPracticeRunner";
import { getQuestionsByIds } from '@/data/questions';
import { useHydrated } from '@/lib/hooks';
import { useProgressStore } from '@/store/useProgressStore';

export default function ReviewQuizPage() {
  const hydrated = useHydrated();
  const restudyQueue = useProgressStore((state) => state.restudyQueue);
  const restudyLabel = useProgressStore((state) => state.restudyLabel);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-ink-500">Loading your re-study set…</p>
      </div>
    );
  }

  if (restudyQueue.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Target size={24} aria-hidden />
        </span>
        <h1 className="mt-4 text-xl font-semibold text-ink-900">No re-study set queued</h1>
        <p className="mt-2 text-sm text-ink-600">
          Finish a mock exam and use the weakness plan on the results page to generate a quiz built
          entirely from the questions you got wrong.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/car/exam"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
          >
            Take a mock exam
          </Link>
          <Link
            href="/car"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
          >
            <Home size={16} aria-hidden />
            Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <CarPracticeRunner
      questions={getQuestionsByIds(restudyQueue)}
      title="Targeted re-study quiz"
      subtitle={
        restudyLabel
          ? `Built from your missed questions · ${restudyLabel}`
          : 'Built entirely from questions you answered incorrectly'
      }
      backHref="/car"
      backLabel="Back to dashboard"
    />
  );
}
