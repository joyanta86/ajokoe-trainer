import { ArrowRight, Car, CarTaxiFront, CircleCheck, Clock, ListChecks } from 'lucide-react';
import Link from 'next/link';

import { questions } from '@/data/questions';
import { taxiQuestions } from '@/data/taxi-questions';
import { EXAM_SECTIONS, TOTAL_QUESTIONS } from '@/lib/exam-config';
import { TAXI_CATEGORIES, TAXI_TOTAL_QUESTIONS } from '@/lib/taxi-config';

const TRACK_CARDS = [
  {
    href: '/car',
    icon: Car,
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
    icon: CarTaxiFront,
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

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          Traficom exam preparation
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
          Two Finnish exams. One trainer.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600">
          Study by topic with instant, law-referenced explanations, sit a realistic timed mock exam,
          and get an automated weak-spot analysis with a one-click targeted re-study quiz.
        </p>
        <p className="mt-4 text-sm text-ink-500">
          Free and open source · No account · Your progress stays in your browser
        </p>
      </section>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {TRACK_CARDS.map((track) => {
          const Icon = track.icon;
          return (
            <Link
              key={track.href}
              href={track.href}
              className="group flex flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50/30"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white">
                  <Icon size={24} aria-hidden />
                </span>
                <ArrowRight
                  size={20}
                  aria-hidden
                  className="mt-2 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-700"
                />
              </div>

              <h2 className="mt-4 text-xl font-bold text-ink-900">{track.name}</h2>
              <p className="text-sm text-ink-500">{track.native}</p>
              <p className="mt-3 flex-1 text-sm text-ink-600">{track.summary}</p>

              <ul className="mt-5 space-y-2">
                {track.facts.map((fact) => (
                  <li key={fact} className="flex items-start gap-2 text-sm text-ink-700">
                    <CircleCheck size={16} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                    {fact}
                  </li>
                ))}
              </ul>

              <p className="mt-5 rounded-xl bg-ink-50 p-3 text-xs text-ink-600">
                <ListChecks size={14} className="mr-1.5 inline text-ink-500" aria-hidden />
                {track.criterion}
              </p>
            </Link>
          );
        })}
      </div>

      <section className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
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
        ].map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="rounded-2xl border border-ink-200 bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Icon size={18} aria-hidden />
              </span>
              <h3 className="mt-3 font-semibold text-ink-900">{feature.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{feature.body}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
