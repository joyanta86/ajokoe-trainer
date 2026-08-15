'use client';

import { motion, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

/** A dashed road-line divider that drifts slowly, like lane markings passing by. */
export function RoadDivider({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none w-full overflow-hidden" aria-hidden>
      <svg
        className={cn('h-6 w-full text-ink-300', className)}
        preserveAspectRatio="none"
        viewBox="0 0 400 24"
      >
        <motion.line
          x1="-40"
          y1="12"
          x2="440"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="16 14"
          animate={reduce ? undefined : { x: [-30, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  );
}
