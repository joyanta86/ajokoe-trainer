'use client';

import { motion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

export function LandingHero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Ambient glow field — the only decorative motion, contained to the hero. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-[-10rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-500/25 blur-[100px]" />
        <div className="animate-float absolute right-[6%] top-10 h-56 w-56 rounded-full bg-spark-300/20 blur-[80px]" />
        <div
          className="animate-float absolute left-[4%] top-48 h-48 w-48 rounded-full bg-brand-400/20 blur-[80px]"
          style={{ animationDelay: '1.5s' }}
        />
        {/* A glowing dashed road line, tying the motif to driving. */}
        <svg
          className="absolute inset-x-0 bottom-0 h-24 w-full text-brand-400/60"
          preserveAspectRatio="none"
          viewBox="0 0 400 40"
        >
          <line
            x1="0"
            y1="20"
            x2="400"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="16 14"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-brand-300/30 bg-brand-50/80 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-brand-400 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-spark-400 shadow-[0_0_8px_2px] shadow-spark-400/70" />
          Traficom exam preparation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          className="mt-5 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl md:text-6xl"
        >
          Two Finnish exams.
          <br className="hidden sm:block" />{' '}
          <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-spark-400 bg-clip-text text-transparent">
            One trainer.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
          className="mx-auto mt-5 max-w-2xl text-lg text-ink-600"
        >
          Study by topic with instant, law-referenced explanations, sit a realistic timed mock
          exam, and get an automated weak-spot analysis with a one-click targeted re-study quiz.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="mt-4 text-sm text-ink-500"
        >
          Free and open source · Sign in to sync your progress across devices
        </motion.p>
      </div>
    </section>
  );
}
