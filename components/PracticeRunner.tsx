'use client';

import { ArrowLeft, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import { QuestionView } from '@/components/QuestionView';
import { ProgressBar, toneForScore } from '@/components/ui/ProgressBar';
import type { AttemptRecorder, QuizQuestion } from '@/lib/quiz';
import { percentage } from '@/lib/utils';

interface PracticeRunnerProps {
  questions: QuizQuestion[];
  title: string;
  subtitle?: string;
  backHref: string;
  backLabel: string;
  /** Reports each graded attempt to the owning track's progress store. */
  onAttempt: AttemptRecorder;
  bookmarks: string[];
  onToggleBookmark: (questionId: string) => void;
}

export function PracticeRunner({
  questions,
  title,
  subtitle,
  backHref,
  backLabel,
  onAttempt,
  bookmarks,
  onToggleBookmark,
}: PracticeRunnerProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [sessionKey, setSessionKey] = useState(0);

  const question = questions[index];
  const answered = Object.keys(answers).length;
  const correctCount = useMemo(
    () => questions.filter((q) => answers[q.id] === q.correctAnswer).length,
    [questions, answers],
  );

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (!question || answers[question.id] !== undefined) return;
      setAnswers((previous) => ({ ...previous, [question.id]: optionIndex }));
      onAttempt(question.id, optionIndex === question.correctAnswer);
    },
    [question, answers, onAttempt],
  );

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setSessionKey((key) => key + 1);
  };

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-semibold text-ink-900">Nothing to practise here yet</h1>
        <p className="mt-2 text-sm text-ink-600">
          This set is empty. Pick a topic from the study hub to start practising.
        </p>
        <Link
          href={backHref}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <ArrowLeft size={16} aria-hidden />
          {backLabel}
        </Link>
      </div>
    );
  }

  const isFinished = answered === questions.length;
  const scorePercent = percentage(correctCount, questions.length);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-400"
      >
        <ArrowLeft size={15} aria-hidden />
        {backLabel}
      </Link>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-ink-600">{subtitle}</p> : null}
        </div>
        <p className="text-sm font-medium text-ink-600">
          <span className="text-emerald-400">{correctCount} correct</span>
          {' · '}
          {answered}/{questions.length} answered
        </p>
      </div>

      <ProgressBar
        className="mt-3"
        value={percentage(answered, questions.length)}
        label="Session progress"
      />

      {isFinished ? (
        <div className="mt-6 rounded-2xl border border-ink-200 bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-400">
              <Trophy size={20} aria-hidden />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-ink-900">Set complete</h2>
              <p className="text-sm text-ink-600">
                {correctCount} of {questions.length} correct ({scorePercent}%)
              </p>
            </div>
          </div>
          <ProgressBar className="mt-4" value={scorePercent} tone={toneForScore(scorePercent)} />
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
            >
              <RotateCcw size={16} aria-hidden />
              Practise again
            </button>
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-white/5"
            >
              {backLabel}
            </Link>
          </div>
        </div>
      ) : null}

      <div className="mt-6" key={`${sessionKey}-${question.id}`}>
        <QuestionView
          question={question}
          selected={answers[question.id] ?? null}
          onSelect={handleSelect}
          revealed={answers[question.id] !== undefined}
          bookmarked={bookmarks.includes(question.id)}
          onToggleBookmark={() => onToggleBookmark(question.id)}
          positionLabel={`Question ${index + 1} of ${questions.length}`}
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
          disabled={index === 0}
          className="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-white/5 disabled:opacity-40"
        >
          <ArrowLeft size={16} aria-hidden />
          Previous
        </button>
        <button
          type="button"
          onClick={() => setIndex((value) => Math.min(questions.length - 1, value + 1))}
          disabled={index === questions.length - 1}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-40"
        >
          Next
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}
