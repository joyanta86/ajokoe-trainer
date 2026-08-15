'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function Card({
  children,
  className,
  interactive = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Adds a hover lift + shadow, for cards that are themselves clickable. */
  interactive?: boolean;
  /** Entrance-animation delay in seconds, for staggering a grid of cards. */
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'rounded-2xl border border-ink-200 bg-surface shadow-sm transition-all duration-300',
        interactive && 'hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({
  title,
  subtitle,
  icon,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-ink-100 px-5 py-4">
      <div className="flex items-start gap-3">
        {icon ? <span className="mt-0.5 text-brand-400">{icon}</span> : null}
        <div>
          <h2 className="text-base font-semibold text-ink-900">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-sm text-ink-500">{subtitle}</p> : null}
        </div>
      </div>
      {action}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('px-5 py-4', className)}>{children}</div>;
}
