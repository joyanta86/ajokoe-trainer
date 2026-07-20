'use client';

import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

import { ProgressBar, toneForScore } from '@/components/ui/ProgressBar';
import { taxiQuestions } from '@/data/taxi-questions';
import { useHydrated } from '@/lib/hooks';
import {
  TAXI_CATEGORIES,
  TAXI_CATEGORY_BLURB,
  TAXI_CATEGORY_FI,
  taxiCategorySlug,
} from '@/lib/taxi-config';
import { percentage } from '@/lib/utils';
import { useTaxiProgressStore } from '@/store/useTaxiProgressStore';

export default function TaxiStudyHubPage() {
  const hydrated = useHydrated();
  const attempts = useTaxiProgressStore((state) => state.attempts);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="flex items-start gap-3">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <BookOpen size={20} aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Taxi study hub</h1>
          <p className="mt-1 text-ink-600">
            Practise one category at a time. Every answer is validated instantly and explained with
            its reference in Finnish transport legislation and Traficom guidance.
          </p>
        </div>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TAXI_CATEGORIES.map((category) => {
          const inCategory = taxiQuestions.filter((q) => q.category === category);
          const mastered = hydrated
            ? inCategory.filter((q) => attempts[q.id]?.lastCorrect).length
            : 0;
          const percent = percentage(mastered, inCategory.length);

          return (
            <Link
              key={category}
              href={`/taxi/study/${taxiCategorySlug(category)}`}
              className="group flex flex-col rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-ink-900">{category}</h2>
                  <p className="text-xs text-ink-500">{TAXI_CATEGORY_FI[category]}</p>
                </div>
                <ArrowRight
                  size={18}
                  aria-hidden
                  className="shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700"
                />
              </div>

              <p className="mt-3 flex-1 text-sm text-ink-600">{TAXI_CATEGORY_BLURB[category]}</p>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-500">
                    {mastered}/{inCategory.length} mastered
                  </span>
                  <span className="font-semibold text-ink-700">{percent}%</span>
                </div>
                <ProgressBar
                  className="mt-2"
                  value={percent}
                  tone={toneForScore(percent)}
                  label={`${category} progress`}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
