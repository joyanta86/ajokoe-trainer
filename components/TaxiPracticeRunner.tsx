'use client';

import { PracticeRunner } from '@/components/PracticeRunner';
import { toQuizQuestion } from '@/lib/taxi-logic';
import type { TaxiQuestion } from '@/lib/taxi-types';
import { useTaxiProgressStore } from '@/store/useTaxiProgressStore';

/**
 * Binds the shared practice runner to the taxi progress store, so server
 * components can render a practice session without touching client state.
 */
export function TaxiPracticeRunner({
  questions,
  title,
  subtitle,
  backHref,
  backLabel,
}: {
  questions: TaxiQuestion[];
  title: string;
  subtitle?: string;
  backHref: string;
  backLabel: string;
}) {
  const recordAttempt = useTaxiProgressStore((state) => state.recordAttempt);
  const toggleBookmark = useTaxiProgressStore((state) => state.toggleBookmark);
  const bookmarks = useTaxiProgressStore((state) => state.bookmarks);

  return (
    <PracticeRunner
      questions={questions.map(toQuizQuestion)}
      title={title}
      subtitle={subtitle}
      backHref={backHref}
      backLabel={backLabel}
      onAttempt={recordAttempt}
      bookmarks={bookmarks}
      onToggleBookmark={toggleBookmark}
    />
  );
}
