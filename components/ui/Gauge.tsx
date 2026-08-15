'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { animate, motion, useReducedMotion } from 'motion/react';

import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { cn } from '@/lib/utils';

type Tone = 'brand' | 'success' | 'warning' | 'danger';

const TONE_STROKE: Record<Tone, string> = {
  brand: 'var(--color-brand-500)',
  success: 'var(--color-spark-400)',
  warning: '#fbbf24',
  danger: '#fb7185',
};

export function toneForGauge(value: number): Tone {
  if (value >= 85) return 'success';
  if (value >= 60) return 'brand';
  if (value >= 40) return 'warning';
  return 'danger';
}

const SIZE = 160;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CENTER = SIZE / 2;
const START_ANGLE = 135; // degrees, bottom-left — a 270° sweep, 90° gap at the bottom
const SWEEP_ANGLE = 270;
const TICK_COUNT = 8;

function polarPoint(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

/** An SVG arc path from `startAngle` sweeping clockwise by `sweepDeg` degrees. */
function describeArc(startAngle: number, sweepDeg: number, radius = RADIUS) {
  const endAngle = startAngle + sweepDeg;
  const start = polarPoint(startAngle, radius);
  const end = polarPoint(endAngle, radius);
  const largeArcFlag = sweepDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export function GaugeChart({
  value,
  label,
  tooltip,
  className,
}: {
  /** 0-100 */
  value: number;
  label?: string;
  /** Shown in a tooltip on hover/focus — e.g. how the score is composed. */
  tooltip?: string;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  const reduce = useReducedMotion();
  const tone = toneForGauge(clamped);
  const [hovered, setHovered] = useState(false);
  const gradientId = useId();
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const apply = (progress: number) => {
      const sweep = SWEEP_ANGLE * (progress / 100);
      pathRef.current?.setAttribute('d', progress <= 0 ? '' : describeArc(START_ANGLE, sweep));
      const tip = polarPoint(START_ANGLE + sweep, RADIUS);
      dotRef.current?.setAttribute('cx', String(tip.x));
      dotRef.current?.setAttribute('cy', String(tip.y));
    };

    if (reduce) {
      apply(clamped);
      return;
    }
    apply(0);
    const controls = animate(0, clamped, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: apply,
    });
    return () => controls.stop();
  }, [clamped, reduce]);

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={tooltip ? 0 : undefined}
      role={tooltip ? 'img' : undefined}
      aria-label={tooltip ?? label}
    >
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={TONE_STROKE[tone]} stopOpacity="0.6" />
            <stop offset="100%" stopColor={TONE_STROKE[tone]} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Tick marks — speedometer detail */}
        {Array.from({ length: TICK_COUNT + 1 }, (_, i) => {
          const angle = START_ANGLE + (SWEEP_ANGLE / TICK_COUNT) * i;
          const outer = polarPoint(angle, RADIUS + STROKE / 2 + 4);
          const inner = polarPoint(angle, RADIUS + STROKE / 2 + (i % 2 === 0 ? 9 : 7));
          return (
            <line
              key={angle}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--color-ink-300)"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          );
        })}

        {/* Background track — the full 270° sweep, always visible */}
        <path
          d={describeArc(START_ANGLE, SWEEP_ANGLE)}
          fill="none"
          stroke="var(--color-ink-200)"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />

        {/* Value arc — grown from 0 to `clamped` degrees on mount */}
        <path
          ref={pathRef}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={STROKE}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${TONE_STROKE[tone]})` }}
        />

        {/* Needle-tip dot for a dashboard-gauge feel */}
        <motion.circle
          ref={dotRef}
          r={STROKE / 2.4}
          fill={TONE_STROKE[tone]}
          style={{ filter: `drop-shadow(0 0 4px ${TONE_STROKE[tone]})` }}
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-2">
        <p className="text-4xl font-bold tracking-tight text-ink-900">
          <AnimatedNumber value={clamped} />
          <span className="text-xl font-semibold text-ink-400">%</span>
        </p>
        {label ? <p className="mt-0.5 text-xs text-ink-500">{label}</p> : null}
      </div>

      {tooltip ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute -bottom-2 left-1/2 z-10 w-52 -translate-x-1/2 translate-y-full rounded-lg border border-ink-200 bg-surface-2 p-2.5 text-center text-xs text-ink-600 shadow-lg"
        >
          {tooltip}
        </motion.div>
      ) : null}
    </div>
  );
}
