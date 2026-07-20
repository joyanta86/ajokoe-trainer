'use client';

import type { Addressable } from '@/lib/quiz';
import { cn } from '@/lib/utils';

interface NavigationMatrixProps {
  questions: Addressable[];
  answers: Record<string, number | null>;
  flagged: string[];
  currentIndex: number;
  onJump: (index: number) => void;
}

export function NavigationMatrix({
  questions,
  answers,
  flagged,
  currentIndex,
  onJump,
}: NavigationMatrixProps) {
  const answeredCount = questions.filter((q) => answers[q.id] !== null && answers[q.id] !== undefined).length;

  return (
    <nav aria-label="Question navigation">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold text-ink-900">Questions</h2>
        <p className="text-xs text-ink-500">
          {answeredCount}/{questions.length} answered
        </p>
      </div>

      <ol className="mt-3 grid grid-cols-8 gap-1.5 sm:grid-cols-10 lg:grid-cols-6">
        {questions.map((question, index) => {
          const isAnswered = answers[question.id] !== null && answers[question.id] !== undefined;
          const isFlagged = flagged.includes(question.id);
          const isCurrent = index === currentIndex;

          return (
            <li key={question.id}>
              <button
                type="button"
                onClick={() => onJump(index)}
                aria-current={isCurrent ? 'true' : undefined}
                aria-label={`Question ${index + 1}${isAnswered ? ', answered' : ', not answered'}${
                  isFlagged ? ', flagged for review' : ''
                }`}
                className={cn(
                  'relative flex h-9 w-full items-center justify-center rounded-lg border text-xs font-semibold transition-colors',
                  isCurrent && 'ring-2 ring-brand-600 ring-offset-1',
                  isAnswered
                    ? 'border-brand-600 bg-brand-600 text-white hover:bg-brand-700'
                    : 'border-ink-200 bg-white text-ink-600 hover:bg-ink-100',
                )}
              >
                {index + 1}
                {isFlagged ? (
                  <span
                    aria-hidden
                    className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-500"
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      <dl className="mt-4 space-y-1.5 text-xs text-ink-600">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-brand-600 bg-brand-600" aria-hidden />
          <dt>Answered</dt>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-ink-200 bg-white" aria-hidden />
          <dt>Not answered</dt>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-amber-500" aria-hidden />
          <dt>Flagged for review</dt>
        </div>
      </dl>
    </nav>
  );
}
