'use client';

import { ArrowLeft, ArrowRight, Flag, LayoutGrid, Send, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ExamTimer } from '@/components/ExamTimer';
import { NavigationMatrix } from '@/components/NavigationMatrix';
import { QuestionView } from '@/components/QuestionView';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getTaxiQuestionsByIds } from '@/data/taxi-questions';
import { formatDuration } from '@/lib/exam-logic';
import { useHydrated, useTicker } from '@/lib/hooks';
import { TAXI_TIMER_WARNING_SECONDS } from '@/lib/taxi-config';
import { toQuizQuestion } from '@/lib/taxi-logic';
import { cn, percentage } from '@/lib/utils';
import { taxiRemainingSeconds, useTaxiExamStore } from '@/store/useTaxiExamStore';
import { useTaxiProgressStore } from '@/store/useTaxiProgressStore';

export default function TaxiExamRunPage() {
  const router = useRouter();
  const hydrated = useHydrated();

  const active = useTaxiExamStore((state) => state.active);
  const answerQuestion = useTaxiExamStore((state) => state.answerQuestion);
  const toggleFlag = useTaxiExamStore((state) => state.toggleFlag);
  const goToQuestion = useTaxiExamStore((state) => state.goToQuestion);
  const submitExam = useTaxiExamStore((state) => state.submitExam);
  const recordManyAttempts = useTaxiProgressStore((state) => state.recordManyAttempts);

  const [showMatrix, setShowMatrix] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const submittingRef = useRef(false);

  // Re-render every second while an exam is running so the countdown advances.
  useTicker(hydrated && active !== null);

  const examQuestions = useMemo(
    () => (active ? getTaxiQuestionsByIds(active.questionIds) : []),
    [active],
  );

  const finish = useCallback(() => {
    if (submittingRef.current || !active) return;
    submittingRef.current = true;

    // Feed exam answers into the study-progress store before grading clears state.
    recordManyAttempts(
      examQuestions.map((question) => ({
        questionId: question.id,
        isCorrect: active.answers[question.id] === question.correctAnswer,
      })),
    );

    const resultId = submitExam();
    if (resultId) {
      router.replace(`/taxi/results?id=${resultId}`);
    } else {
      submittingRef.current = false;
    }
  }, [active, examQuestions, recordManyAttempts, router, submitExam]);

  const secondsLeft = hydrated ? taxiRemainingSeconds(active) : 0;

  // Auto-submit the moment the countdown reaches zero.
  useEffect(() => {
    if (hydrated && active && secondsLeft <= 0) finish();
  }, [hydrated, active, secondsLeft, finish]);

  // No exam in progress — send the candidate back to the briefing.
  useEffect(() => {
    if (hydrated && !active && !submittingRef.current) router.replace('/taxi/exam');
  }, [hydrated, active, router]);

  if (!hydrated || !active) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-ink-500">Loading exam…</p>
      </div>
    );
  }

  const question = examQuestions[active.currentIndex];
  if (!question) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-ink-500">Preparing question…</p>
      </div>
    );
  }

  const answeredCount = examQuestions.filter(
    (q) => active.answers[q.id] !== null && active.answers[q.id] !== undefined,
  ).length;
  const unansweredCount = examQuestions.length - answeredCount;
  const isFlagged = active.flagged.includes(question.id);
  const isLast = active.currentIndex === examQuestions.length - 1;

  return (
    <div className="min-h-screen bg-ink-100">
      <header className="sticky top-0 z-30 border-b border-ink-200 bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">
              Taxi qualification mock exam
            </p>
            <p className="text-sm font-medium text-ink-700">
              Question {active.currentIndex + 1} of {examQuestions.length}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ExamTimer secondsLeft={secondsLeft} warningSeconds={TAXI_TIMER_WARNING_SECONDS} />
            <button
              type="button"
              onClick={() => setShowMatrix(true)}
              className="flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-white/5 lg:hidden"
            >
              <LayoutGrid size={16} aria-hidden />
              <span className="sr-only sm:not-sr-only">Questions</span>
            </button>
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
            >
              <Send size={16} aria-hidden />
              <span className="sr-only sm:not-sr-only">Submit</span>
            </button>
          </div>
        </div>
        <ProgressBar
          value={percentage(answeredCount, examQuestions.length)}
          size="sm"
          className="rounded-none"
          label="Exam progress"
        />
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_16rem]">
        <div>
          <QuestionView
            question={toQuizQuestion(question)}
            selected={active.answers[question.id] ?? null}
            onSelect={(optionIndex) => answerQuestion(question.id, optionIndex)}
            revealed={false}
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goToQuestion(active.currentIndex - 1)}
              disabled={active.currentIndex === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-surface px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-white/5 disabled:opacity-40"
            >
              <ArrowLeft size={16} aria-hidden />
              Previous
            </button>

            <button
              type="button"
              onClick={() => toggleFlag(question.id)}
              aria-pressed={isFlagged}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors',
                isFlagged
                  ? 'border-amber-300 bg-amber-50 text-amber-700'
                  : 'border-ink-200 bg-surface text-ink-700 hover:bg-white/5',
              )}
            >
              <Flag size={16} aria-hidden />
              {isFlagged ? 'Flagged' : 'Flag for review'}
            </button>

            {isLast ? (
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <Send size={16} aria-hidden />
                Finish exam
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goToQuestion(active.currentIndex + 1)}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
              >
                Next
                <ArrowRight size={16} aria-hidden />
              </button>
            )}
          </div>
        </div>

        <aside className="hidden rounded-2xl border border-ink-200 bg-surface p-4 lg:block lg:h-fit lg:sticky lg:top-24">
          <NavigationMatrix
            questions={examQuestions}
            answers={active.answers}
            flagged={active.flagged}
            currentIndex={active.currentIndex}
            onJump={goToQuestion}
          />
        </aside>
      </div>

      {showMatrix ? (
        <div className="fixed inset-0 z-50 flex items-end bg-black/60 lg:hidden">
          <div className="max-h-[80vh] w-full overflow-y-auto rounded-t-2xl bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-ink-900">Navigation matrix</h2>
              <button
                type="button"
                onClick={() => setShowMatrix(false)}
                className="rounded-lg p-1.5 text-ink-500 hover:bg-white/5"
                aria-label="Close navigation"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
            <NavigationMatrix
              questions={examQuestions}
              answers={active.answers}
              flagged={active.flagged}
              currentIndex={active.currentIndex}
              onJump={(index) => {
                goToQuestion(index);
                setShowMatrix(false);
              }}
            />
          </div>
        </div>
      ) : null}

      {showConfirm ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="taxi-submit-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl">
            <h2 id="taxi-submit-title" className="text-lg font-semibold text-ink-900">
              Submit your exam?
            </h2>
            <p className="mt-2 text-sm text-ink-600">
              {unansweredCount > 0 ? (
                <>
                  <strong className="text-rose-400">
                    {unansweredCount} question{unansweredCount === 1 ? '' : 's'} unanswered
                  </strong>{' '}
                  — blank answers count as errors, exactly as in the official exam.
                </>
              ) : (
                'All questions are answered. You can still go back and change answers if you cancel.'
              )}
            </p>
            <p className="mt-2 text-sm text-ink-500">
              Time remaining: {formatDuration(secondsLeft)}
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-white/5"
              >
                Keep working
              </button>
              <button
                type="button"
                onClick={finish}
                className="rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
              >
                Submit exam
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
