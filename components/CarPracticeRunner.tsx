'use client';

import { PracticeRunner } from '@/components/PracticeRunner';
import { toQuizQuestion } from '@/lib/exam-logic';
import type { Question } from '@/lib/types';
import { useProgressStore } from '@/store/useProgressStore';

/**
 * Binds the shared practice runner to the B-license progress store, so server
 * components can render a practice session without touching client state.
 */
export function CarPracticeRunner({
  questions,
  title,
  subtitle,
  backHref,
  backLabel,
}: {
  questions: Question[];
  title: string;
  subtitle?: string;
  backHref: string;
  backLabel: string;
}) {
  const recordAttempt = useProgressStore((state) => state.recordAttempt);
  const toggleBookmark = useProgressStore((state) => state.toggleBookmark);
  const bookmarks = useProgressStore((state) => state.bookmarks);

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
