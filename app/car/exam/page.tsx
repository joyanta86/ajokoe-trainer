'use client';

import { AlertTriangle, Clock, ListChecks, Play, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { EXAM_SECTIONS, TOTAL_QUESTIONS } from '@/lib/exam-config';
import { formatDuration } from '@/lib/exam-logic';
import { useHydrated } from '@/lib/hooks';
import { remainingSeconds, useExamStore } from '@/store/useExamStore';

export default function ExamBriefingPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const active = useExamStore((state) => state.active);
  const startExam = useExamStore((state) => state.startExam);
  const abandonExam = useExamStore((state) => state.abandonExam);

  const hasActive = hydrated && active !== null;

  const begin = () => {
    startExam();
    router.push("/car/exam/run");
  };

  const discardAndRestart = () => {
    abandonExam();
    startExam();
    router.push("/car/exam/run");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-ink-900">Traficom mock exam</h1>
      <p className="mt-2 text-ink-600">
        A full simulation of the B-license theory exam: {TOTAL_QUESTIONS} questions in 30 minutes,
        graded against the official error allowances.
      </p>

      {hasActive ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-amber-700">
              <Clock size={20} aria-hidden />
            </span>
            <div className="flex-1">
              <h2 className="font-semibold text-ink-900">You have an exam in progress</h2>
              <p className="mt-1 text-sm text-ink-700">
                The clock has kept running — {formatDuration(remainingSeconds(active))} remaining.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/car/exam/run")}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700"
                >
                  <Play size={16} aria-hidden />
                  Resume exam
                </button>
                <button
                  type="button"
                  onClick={discardAndRestart}
                  className="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-white px-4 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100"
                >
                  <RotateCcw size={16} aria-hidden />
                  Discard and start fresh
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Card className="mt-6">
        <CardHeader
          title="Exam structure and passing criteria"
          subtitle="You must stay within the error limit in every section simultaneously"
          icon={<ListChecks size={18} aria-hidden />}
        />
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-left text-xs uppercase tracking-wide text-ink-500">
                <th scope="col" className="pb-2">
                  Section
                </th>
                <th scope="col" className="pb-2 text-right">
                  Questions
                </th>
                <th scope="col" className="pb-2 text-right">
                  Max errors
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {EXAM_SECTIONS.map((section) => (
                <tr key={section.type}>
                  <td className="py-3">
                    <p className="font-medium text-ink-900">{section.label}</p>
                    <p className="text-xs text-ink-500">{section.description}</p>
                  </td>
                  <td className="py-3 text-right font-semibold text-ink-900">{section.count}</td>
                  <td className="py-3 text-right font-semibold text-ink-900">
                    {section.allowedErrors}
                  </td>
                </tr>
              ))}
              <tr className="bg-ink-50 font-semibold text-ink-900">
                <td className="py-3">Total</td>
                <td className="py-3 text-right">{TOTAL_QUESTIONS}</td>
                <td className="py-3 text-right">—</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      <div className="mt-6 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 font-semibold text-ink-900">
          <AlertTriangle size={18} className="text-amber-600" aria-hidden />
          Before you start
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          <li>• The 30-minute timer starts immediately and does not pause.</li>
          <li>• The exam auto-submits when time expires; unanswered questions count as errors.</li>
          <li>• You can flag questions and jump between them freely using the navigation matrix.</li>
          <li>• No feedback is shown during the exam — the full breakdown comes at the end.</li>
          <li>• Progress is saved locally, so a reload or closed tab will not lose your answers.</li>
        </ul>
      </div>

      {!hasActive ? (
        <button
          type="button"
          onClick={begin}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-4 text-base font-semibold text-white shadow-sm hover:bg-brand-800 sm:w-auto"
        >
          <Play size={18} aria-hidden />
          Start the 30-minute exam
        </button>
      ) : null}
    </div>
  );
}
