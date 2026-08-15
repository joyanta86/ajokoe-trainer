'use client';

import {
  ArrowRight,
  BookOpen,
  Bookmark,
  ClipboardCheck,
  Gauge,
  History,
  Target,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { ProgressBar, toneForScore } from '@/components/ui/ProgressBar';
import { questions } from '@/data/questions';
import {
  CATEGORIES,
  CATEGORY_BLURB,
  CATEGORY_FI,
  EXAM_SECTIONS,
  categorySlug,
} from '@/lib/exam-config';
import { computeReadinessIndex, formatExamDate, readinessVerdict } from '@/lib/exam-logic';
import { useHydrated } from '@/lib/hooks';
import { percentage } from '@/lib/utils';
import { useExamStore } from '@/store/useExamStore';
import { useProgressStore } from '@/store/useProgressStore';

const VERDICT_TONE = {
  excellent: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  good: 'text-brand-400 bg-brand-50 border-brand-200',
  warning: 'text-amber-700 bg-amber-50 border-amber-200',
  danger: 'text-rose-700 bg-rose-50 border-rose-200',
} as const;

export default function DashboardPage() {
  const hydrated = useHydrated();
  const attempts = useProgressStore((state) => state.attempts);
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const restudyQueue = useProgressStore((state) => state.restudyQueue);
  const restudyLabel = useProgressStore((state) => state.restudyLabel);
  const history = useExamStore((state) => state.history);
  const active = useExamStore((state) => state.active);

  const attemptedIds = hydrated ? Object.keys(attempts) : [];
  const readiness = hydrated ? computeReadinessIndex(history, attemptedIds) : 0;
  const verdict = readinessVerdict(readiness);

  const masteredIds = attemptedIds.filter((id) => attempts[id]?.lastCorrect);
  const overallProgress = percentage(masteredIds.length, questions.length);

  const topicProgress = CATEGORIES.map((category) => {
    const inCategory = questions.filter((q) => q.category === category);
    const mastered = inCategory.filter((q) => attempts[q.id]?.lastCorrect).length;
    return {
      category,
      total: inCategory.length,
      mastered,
      percent: percentage(mastered, inCategory.length),
    };
  });

  const recentExams = history.slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="rounded-2xl border border-ink-200 bg-surface p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-400">
          Ajokorttiteoriakoe · B-luokka
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          Pass the Finnish theory exam with confidence
        </h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          Study by topic with instant law-referenced explanations, then sit a full 30-minute
          Traficom-style mock exam of {EXAM_SECTIONS.reduce((sum, s) => sum + s.count, 0)} questions
          and get an automated weak-spot analysis.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={active && hydrated ? '/exam/run' : '/exam'}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
          >
            <ClipboardCheck size={18} aria-hidden />
            {active && hydrated ? 'Resume mock exam' : 'Start mock exam'}
          </Link>
          <Link
            href="/car/study"
            className="inline-flex items-center gap-2 rounded-xl border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-800 hover:bg-white/5"
          >
            <BookOpen size={18} aria-hidden />
            Study by topic
          </Link>
        </div>
      </section>

      {hydrated && restudyQueue.length > 0 ? (
        <section className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-amber-400">
                <Target size={20} aria-hidden />
              </span>
              <div>
                <h2 className="font-semibold text-ink-900">Targeted re-study quiz ready</h2>
                <p className="text-sm text-ink-700">
                  {restudyQueue.length} question{restudyQueue.length === 1 ? '' : 's'} queued
                  {restudyLabel ? ` · ${restudyLabel}` : ''}
                </p>
              </div>
            </div>
            <Link
              href="/car/review"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700"
            >
              Launch quiz
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </section>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader
            title="Test Readiness Index"
            subtitle="Accuracy, pass rate and bank coverage"
            icon={<Gauge size={18} aria-hidden />}
          />
          <CardBody>
            <p className="text-5xl font-bold tracking-tight text-ink-900">
              {readiness}
              <span className="text-2xl font-semibold text-ink-400">%</span>
            </p>
            <ProgressBar className="mt-3" value={readiness} tone={toneForScore(readiness)} />
            <p
              className={`mt-4 rounded-lg border px-3 py-2 text-sm font-medium ${VERDICT_TONE[verdict.tone]}`}
            >
              {verdict.label}
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-500">Mock exams taken</dt>
                <dd className="font-semibold text-ink-900">{hydrated ? history.length : 0}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">Exams passed</dt>
                <dd className="font-semibold text-ink-900">
                  {hydrated ? history.filter((r) => r.isPassed).length : 0}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">Bank coverage</dt>
                <dd className="font-semibold text-ink-900">
                  {percentage(attemptedIds.length, questions.length)}%
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">Flagged questions</dt>
                <dd className="font-semibold text-ink-900">{hydrated ? bookmarks.length : 0}</dd>
              </div>
            </dl>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader
            title="Topic progress"
            subtitle={`${masteredIds.length} of ${questions.length} questions answered correctly (${overallProgress}%)`}
            icon={<TrendingUp size={18} aria-hidden />}
            action={
              <Link
                href="/car/study"
                className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-400 hover:underline sm:flex"
              >
                Study hub
                <ArrowRight size={14} aria-hidden />
              </Link>
            }
          />
          <CardBody className="space-y-4">
            {topicProgress.map((topic) => (
              <Link
                key={topic.category}
                href={`/car/study/${categorySlug(topic.category)}`}
                className="block rounded-xl p-2 transition-colors hover:bg-white/5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink-900">{topic.category}</p>
                    <p className="text-xs text-ink-500">{CATEGORY_FI[topic.category]}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-ink-700">
                    {topic.mastered}/{topic.total}
                    <span className="ml-2 text-ink-400">{topic.percent}%</span>
                  </p>
                </div>
                <ProgressBar
                  className="mt-2"
                  value={topic.percent}
                  tone={toneForScore(topic.percent)}
                  label={`${topic.category} progress`}
                />
                <p className="mt-1.5 text-xs text-ink-500">{CATEGORY_BLURB[topic.category]}</p>
              </Link>
            ))}
          </CardBody>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Exam history"
            subtitle="Your most recent mock exams"
            icon={<History size={18} aria-hidden />}
          />
          <CardBody>
            {!hydrated || recentExams.length === 0 ? (
              <p className="py-6 text-center text-sm text-ink-500">
                No mock exams yet. Your first attempt establishes a baseline readiness score.
              </p>
            ) : (
              <ul className="divide-y divide-ink-100">
                {recentExams.map((result) => (
                  <li key={result.id}>
                    <Link
                      href={`/car/results?id=${result.id}`}
                      className="flex items-center justify-between gap-4 py-3 transition-colors hover:bg-white/5"
                    >
                      <div>
                        <p className="font-medium text-ink-900">{formatExamDate(result.date)}</p>
                        <p className="text-sm text-ink-500">
                          Theory {result.scoreTheory}/{EXAM_SECTIONS[0].count} · Hazard{' '}
                          {result.scoreHazard}/{EXAM_SECTIONS[1].count} · Risk {result.scoreRisk}/
                          {EXAM_SECTIONS[2].count}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                          result.isPassed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {result.isPassed ? 'PASSED' : 'FAILED'}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Exam structure"
            subtitle="Traficom error allowances"
            icon={<ClipboardCheck size={18} aria-hidden />}
          />
          <CardBody className="space-y-3">
            {EXAM_SECTIONS.map((section) => (
              <div key={section.type} className="rounded-xl border border-ink-100 bg-ink-50 p-3">
                <p className="text-sm font-semibold text-ink-900">{section.label}</p>
                <p className="mt-0.5 text-xs text-ink-600">{section.description}</p>
                <p className="mt-2 text-sm text-ink-700">
                  <span className="font-semibold">{section.count}</span> questions ·{' '}
                  <span className="font-semibold">max {section.allowedErrors}</span> errors
                </p>
              </div>
            ))}
            <p className="text-xs text-ink-500">
              You must stay within the limit in every section at once — exceeding it in any one
              section fails the whole exam.
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="mt-6">
        <Link
          href="/car/bookmarks"
          className="flex items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-surface p-5 shadow-sm transition-colors hover:bg-white/5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Bookmark size={20} aria-hidden />
            </span>
            <div>
              <p className="font-semibold text-ink-900">Flagged questions</p>
              <p className="text-sm text-ink-600">
                Revisit the tricky ones you bookmarked while studying.
              </p>
            </div>
          </div>
          <ArrowRight size={18} className="shrink-0 text-ink-400" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
