'use client';

import { ArrowRight, BookOpen, CheckCircle2, Gauge, Home, Target, Timer, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { QuestionView } from '@/components/QuestionView';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { ProgressBar, toneForScore } from '@/components/ui/ProgressBar';
import { getTaxiQuestionsByIds } from '@/data/taxi-questions';
import { formatDuration, formatExamDate } from '@/lib/exam-logic';
import { useHydrated } from '@/lib/hooks';
import { TAXI_CATEGORY_FI, taxiCategorySlug } from '@/lib/taxi-config';
import {
  computeTaxiCategoryStrength,
  computeTaxiReadinessIndex,
  identifyTaxiWeakSpots,
  taxiReadinessVerdict,
  toQuizQuestion,
} from '@/lib/taxi-logic';
import { percentage } from '@/lib/utils';
import { useTaxiExamStore } from '@/store/useTaxiExamStore';
import { useTaxiProgressStore } from '@/store/useTaxiProgressStore';

function TaxiResultReport({ id }: { id: string }) {
  const router = useRouter();
  const hydrated = useHydrated();

  const result = useTaxiExamStore((state) => state.history.find((entry) => entry.id === id));
  const history = useTaxiExamStore((state) => state.history);
  const attempts = useTaxiProgressStore((state) => state.attempts);
  const bookmarks = useTaxiProgressStore((state) => state.bookmarks);
  const toggleBookmark = useTaxiProgressStore((state) => state.toggleBookmark);
  const setRestudyQueue = useTaxiProgressStore((state) => state.setRestudyQueue);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-ink-500">Loading result…</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-xl font-semibold text-ink-900">Result not found</h1>
        <p className="mt-2 text-sm text-ink-600">
          This exam result is not stored in this browser. Results are saved locally on the device
          where the exam was taken.
        </p>
        <Link
          href="/taxi"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <Home size={16} aria-hidden />
          Back to taxi dashboard
        </Link>
      </div>
    );
  }

  const strengths = computeTaxiCategoryStrength(result);
  const weakSpots = identifyTaxiWeakSpots(result);
  const readiness = computeTaxiReadinessIndex(history, Object.keys(attempts));
  const verdict = taxiReadinessVerdict(readiness);

  const totalQuestions = result.questionIds.length;
  const totalCorrect = Object.values(result.categoryScores).reduce(
    (sum, score) => sum + score.correct,
    0,
  );
  const incorrectQuestions = getTaxiQuestionsByIds(result.incorrectQuestionIds);

  const launchRestudy = () => {
    const label =
      weakSpots.length > 0
        ? `Weakest categories: ${weakSpots.map((spot) => spot.category).join(', ')}`
        : 'Missed questions';
    setRestudyQueue(result.incorrectQuestionIds, label);
    router.push('/taxi/review');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Pass / fail banner with the category-by-category verdict */}
      <section
        className={`rounded-2xl border-2 p-6 ${
          result.isPassed ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className={result.isPassed ? 'text-emerald-600' : 'text-rose-600'}>
              {result.isPassed ? (
                <CheckCircle2 size={44} aria-hidden />
              ) : (
                <XCircle size={44} aria-hidden />
              )}
            </span>
            <div>
              <h1
                className={`text-3xl font-bold tracking-tight ${
                  result.isPassed ? 'text-emerald-800' : 'text-rose-800'
                }`}
              >
                {result.isPassed ? 'PASSED' : 'FAILED'}
              </h1>
              <p className="mt-1 text-sm text-ink-700">
                {result.isPassed
                  ? 'You reached at least 70% in every category.'
                  : 'You fell below 70% in at least one category.'}
              </p>
              <p className="mt-2 text-xs text-ink-500">{formatExamDate(result.date)}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold text-ink-900">
              {totalCorrect}
              <span className="text-lg text-ink-400">/{totalQuestions}</span>
            </p>
            <p className="text-sm text-ink-600">
              {percentage(totalCorrect, totalQuestions)}% correct
            </p>
            <p className="mt-1 flex items-center justify-end gap-1.5 text-xs text-ink-500">
              <Timer size={13} aria-hidden />
              {formatDuration(result.durationSeconds)} used
            </p>
          </div>
        </div>

        <ul className="mt-5 grid gap-2 sm:grid-cols-3">
          {strengths.map((entry) => (
            <li
              key={entry.category}
              className={`rounded-xl border bg-white p-3 ${
                entry.isPassed ? 'border-emerald-200' : 'border-rose-200'
              }`}
            >
              <p className="text-xs font-medium text-ink-600">{entry.category}</p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-lg font-bold text-ink-900">
                  {entry.correct}/{entry.total}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    entry.isPassed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {entry.isPassed ? 'PASSED' : 'FAILED'}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Criteria breakdown */}
      <Card className="mt-6">
        <CardHeader
          title="Traficom criteria breakdown"
          subtitle="Every category must reach the 70% pass mark"
        />
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-left text-xs uppercase tracking-wide text-ink-500">
                <th scope="col" className="pb-2">Category</th>
                <th scope="col" className="pb-2 text-right">Correct</th>
                <th scope="col" className="pb-2 text-right">Score</th>
                <th scope="col" className="pb-2 text-right">Pass mark</th>
                <th scope="col" className="pb-2 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {strengths.map((entry) => (
                <tr key={entry.category}>
                  <td className="py-3">
                    <p className="font-medium text-ink-900">{entry.category}</p>
                    <p className="text-xs text-ink-500">{TAXI_CATEGORY_FI[entry.category]}</p>
                  </td>
                  <td className="py-3 text-right tabular-nums text-ink-700">
                    {entry.correct}/{entry.total}
                  </td>
                  <td
                    className={`py-3 text-right font-semibold tabular-nums ${
                      entry.isPassed ? 'text-ink-900' : 'text-rose-700'
                    }`}
                  >
                    {entry.percentage}%
                  </td>
                  <td className="py-3 text-right tabular-nums text-ink-500">{entry.passMark}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        entry.isPassed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {entry.isPassed ? 'PASS' : 'FAIL'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader title="Category strength" subtitle="Score per taxi topic in this exam" />
          <CardBody className="space-y-4">
            {strengths.map((entry) => (
              <div key={entry.category}>
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-ink-900">{entry.category}</p>
                    <p className="text-xs text-ink-500">{TAXI_CATEGORY_FI[entry.category]}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-ink-700">
                    {entry.correct}/{entry.total}
                    <span className="ml-2 text-ink-400">{entry.percentage}%</span>
                  </p>
                </div>
                <ProgressBar
                  className="mt-2"
                  value={entry.percentage}
                  tone={toneForScore(entry.percentage)}
                  label={`${entry.category} score`}
                />
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Taxi Driver Readiness Index"
            subtitle="Across your recent exams and bank coverage"
            icon={<Gauge size={18} aria-hidden />}
          />
          <CardBody>
            <p className="text-5xl font-bold tracking-tight text-ink-900">
              {readiness}
              <span className="text-2xl font-semibold text-ink-400">%</span>
            </p>
            <ProgressBar className="mt-3" value={readiness} tone={toneForScore(readiness)} />
            <p className="mt-4 text-sm font-medium text-ink-700">{verdict.label}</p>
            <p className="mt-3 text-xs text-ink-500">
              Blends recent accuracy (60%), pass rate (25%) and how much of the question bank you
              have attempted (15%), so a single lucky exam cannot inflate it.
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Automated weakness plan */}
      <Card className="mt-6">
        <CardHeader
          title="Automated weakness plan"
          subtitle="Generated from the questions you missed"
          icon={<Target size={18} aria-hidden />}
        />
        <CardBody>
          {result.incorrectQuestionIds.length === 0 ? (
            <p className="text-sm text-ink-600">
              A perfect score — there is nothing to re-study from this exam. Take another mock exam
              to confirm the result is consistent.
            </p>
          ) : (
            <>
              <p className="text-sm text-ink-700">
                You missed{' '}
                <strong>
                  {result.incorrectQuestionIds.length} question
                  {result.incorrectQuestionIds.length === 1 ? '' : 's'}
                </strong>
                . These categories need the most attention:
              </p>

              <ul className="mt-4 space-y-3">
                {weakSpots.map((spot, index) => (
                  <li
                    key={spot.category}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-200 bg-ink-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm font-bold text-brand-700">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{spot.category}</p>
                        <p className="text-xs text-ink-500">
                          {spot.correct}/{spot.total} correct · {spot.percentage}%
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/taxi/study/${taxiCategorySlug(spot.category)}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-xs font-semibold text-ink-700 hover:bg-ink-100"
                    >
                      <BookOpen size={14} aria-hidden />
                      Study category
                    </Link>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={launchRestudy}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3.5 text-sm font-semibold text-white hover:bg-brand-800 sm:w-auto"
              >
                <Target size={18} aria-hidden />
                Launch targeted re-study quiz ({result.incorrectQuestionIds.length})
                <ArrowRight size={16} aria-hidden />
              </button>
            </>
          )}
        </CardBody>
      </Card>

      {incorrectQuestions.length > 0 ? (
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-ink-900">Review your mistakes</h2>
          <p className="mt-1 text-sm text-ink-600">
            Each answer is shown with the correct option and its basis in law or Traficom guidance.
          </p>
          <div className="mt-4 space-y-5">
            {incorrectQuestions.map((question) => (
              <QuestionView
                key={question.id}
                question={toQuizQuestion(question)}
                selected={result.answers[question.id] ?? null}
                onSelect={() => undefined}
                revealed
                disabled
                bookmarked={bookmarks.includes(question.id)}
                onToggleBookmark={() => toggleBookmark(question.id)}
              />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/taxi/exam"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Take another mock exam
        </Link>
        <Link
          href="/taxi"
          className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
        >
          <Home size={16} aria-hidden />
          Taxi dashboard
        </Link>
      </div>
    </div>
  );
}

/** Reads the result id from `?id=` so the route can be statically exported. */
function TaxiResultFromQuery() {
  const id = useSearchParams().get('id') ?? '';
  return <TaxiResultReport id={id} />;
}

export default function TaxiResultPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <p className="text-sm text-ink-500">Loading result…</p>
        </div>
      }
    >
      <TaxiResultFromQuery />
    </Suspense>
  );
}
