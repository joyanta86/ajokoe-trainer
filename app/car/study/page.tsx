'use client';

import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

import { ProgressBar, toneForScore } from '@/components/ui/ProgressBar';
import { questions } from '@/data/questions';
import { CATEGORIES, CATEGORY_BLURB, CATEGORY_FI, categorySlug } from '@/lib/exam-config';
import { useHydrated } from '@/lib/hooks';
import { percentage } from '@/lib/utils';
import { useProgressStore } from '@/store/useProgressStore';

export default function StudyHubPage() {
  const hydrated = useHydrated();
  const attempts = useProgressStore((state) => state.attempts);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="flex items-start gap-3">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-400">
          <BookOpen size={20} aria-hidden />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Study hub</h1>
          <p className="mt-1 text-ink-600">
            Practise one topic at a time. Every answer is validated instantly and explained with its
            reference in Finnish road traffic law.
          </p>
        </div>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((category, index) => {
          const inCategory = questions.filter((q) => q.category === category);
          const mastered = hydrated
            ? inCategory.filter((q) => attempts[q.id]?.lastCorrect).length
            : 0;
          const percent = percentage(mastered, inCategory.length);

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/car/study/${categorySlug(category)}`}
                className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-500/10 hover:shadow-lg hover:shadow-brand-900/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-ink-900">{CATEGORY_FI[category]}</h2>
                    <p className="text-xs text-ink-500">{category}</p>
                  </div>
                  <ArrowRight
                    size={18}
                    aria-hidden
                    className="shrink-0 text-ink-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand-400"
                  />
                </div>

                <p className="mt-3 flex-1 text-sm text-ink-600">{CATEGORY_BLURB[category]}</p>

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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
