import { cn } from '@/lib/utils';

type Tone = 'brand' | 'success' | 'warning' | 'danger' | 'neutral';

const TONE_CLASS: Record<Tone, string> = {
  brand: 'bg-brand-600',
  success: 'bg-emerald-600',
  warning: 'bg-amber-500',
  danger: 'bg-rose-600',
  neutral: 'bg-ink-400',
};

export function toneForScore(value: number): Tone {
  if (value >= 85) return 'success';
  if (value >= 60) return 'brand';
  if (value >= 40) return 'warning';
  return 'danger';
}

interface ProgressBarProps {
  value: number;
  tone?: Tone;
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function ProgressBar({ value, tone = 'brand', label, className, size = 'md' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div
      className={cn('w-full overflow-hidden rounded-full bg-ink-200', size === 'sm' ? 'h-1.5' : 'h-2.5', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-500', TONE_CLASS[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
