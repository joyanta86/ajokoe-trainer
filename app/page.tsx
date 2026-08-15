import { CircleCheck, Clock, ListChecks } from 'lucide-react';

import { LandingHero } from '@/components/LandingHero';
import { TrackCard } from '@/components/TrackCard';
import { questions } from '@/data/questions';
import { taxiQuestions } from '@/data/taxi-questions';
import { EXAM_SECTIONS, TOTAL_QUESTIONS } from '@/lib/exam-config';
import { TAXI_CATEGORIES, TAXI_TOTAL_QUESTIONS } from '@/lib/taxi-config';

const TRACK_CARDS = [
  {
    href: '/car',
    icon: 'car',
    name: 'Driving theory exam',
    native: 'Ajokorttiteoriakoe · B-luokka',
    summary:
      'The full B-license theory exam: traffic signs, priority rules, hazard perception, road safety and vehicle technology.',
    facts: [
      `${TOTAL_QUESTIONS} questions in 30 minutes`,
      `${EXAM_SECTIONS.length} sections, each with its own error allowance`,
      `${questions.length} questions in the bank`,
    ],
    criterion:
      'Pass by staying within the allowed errors in every section at once — 3 theory, 8 hazard, 1 risk.',
  },
  {
    href: '/taxi',
    icon: 'taxi',
    name: 'Taxi driver qualification',
    native: 'Taksinkuljettajan ajolupakoe',
    summary:
      'The professional taxi exam: passenger safety and accessibility, transport legislation and driver duties, customer service and route selection.',
    facts: [
      `${TAXI_TOTAL_QUESTIONS} questions in 45 minutes`,
      `${TAXI_CATEGORIES.length} categories, 10 questions each`,
      `${taxiQuestions.length} questions in the bank`,
    ],
    criterion: 'Pass by scoring at least 70 % (7 of 10) in every category — one short fails the exam.',
  },
] as const;

const FEATURES = [
  {
    icon: ListChecks,
    title: 'Study by topic',
    body: 'Every answer is validated instantly and explained with its basis in Finnish law.',
  },
  {
    icon: Clock,
    title: 'Realistic simulation',
    body: 'A strict countdown, a navigation matrix, flags for review and auto-submit on expiry.',
  },
  {
    icon: CircleCheck,
    title: 'Know when you are ready',
    body: 'A readiness index and a weakness plan built from the questions you actually missed.',
  },
] as const;

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <LandingHero />

      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {TRACK_CARDS.map((track, index) => (
            <TrackCard key={track.href} track={track} index={index} />
          ))}
        </div>

        <section className="mt-14 grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-ink-200 bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-400 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                  <Icon size={18} aria-hidden />
                </span>
                <h3 className="mt-3 font-semibold text-ink-900">{feature.title}</h3>
                <p className="mt-1 text-sm text-ink-600">{feature.body}</p>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
