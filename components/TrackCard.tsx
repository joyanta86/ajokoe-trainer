'use client';

import { ArrowRight, Car, CarTaxiFront, CircleCheck, ListChecks } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const ICONS = { car: Car, taxi: CarTaxiFront } as const;

interface TrackCardData {
  href: string;
  icon: keyof typeof ICONS;
  name: string;
  native: string;
  summary: string;
  facts: readonly string[];
  criterion: string;
}

export function TrackCard({ track, index }: { track: TrackCardData; index: number }) {
  const Icon = ICONS[track.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={track.href}
        className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/10 active:translate-y-0 active:shadow-sm"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white transition-transform duration-300 group-hover:scale-110">
            <Icon size={24} aria-hidden />
          </span>
          <ArrowRight
            size={20}
            aria-hidden
            className="mt-2 text-ink-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-400"
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
    </motion.div>
  );
}
