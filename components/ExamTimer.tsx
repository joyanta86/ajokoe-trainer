'use client';

import { AlarmClock, Clock } from 'lucide-react';

import { TIMER_WARNING_SECONDS } from '@/lib/exam-config';
import { formatDuration } from '@/lib/exam-logic';
import { cn } from '@/lib/utils';

export function ExamTimer({
  secondsLeft,
  warningSeconds = TIMER_WARNING_SECONDS,
}: {
  secondsLeft: number;
  /** Seconds remaining at which the timer enters its warning state. */
  warningSeconds?: number;
}) {
  const isWarning = secondsLeft <= warningSeconds;
  const isCritical = secondsLeft <= 60;

  return (
    <div
      role="timer"
      aria-live={isWarning ? 'assertive' : 'off'}
      aria-atomic="true"
      className={cn(
        'flex items-center gap-2 rounded-xl border px-3 py-2 font-mono text-lg font-bold tabular-nums',
        isCritical
          ? 'animate-pulse border-rose-300 bg-rose-50 text-rose-700'
          : isWarning
            ? 'border-amber-300 bg-amber-50 text-amber-700'
            : 'border-ink-200 bg-white text-ink-900',
      )}
    >
      {isWarning ? <AlarmClock size={18} aria-hidden /> : <Clock size={18} aria-hidden />}
      <span>{formatDuration(secondsLeft)}</span>
      <span className="sr-only">
        {isWarning ? 'Warning: less than five minutes remaining' : 'time remaining'}
      </span>
    </div>
  );
}
