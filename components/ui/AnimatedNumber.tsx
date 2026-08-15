'use client';

import { useEffect, useRef } from 'react';
import { animate, useMotionValue, useReducedMotion, useTransform } from 'motion/react';

export function AnimatedNumber({
  value,
  duration = 1,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toString());
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce) {
      motionValue.set(value);
      if (spanRef.current) spanRef.current.textContent = String(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduce]);

  useEffect(() => {
    return rounded.on('change', (latest) => {
      if (spanRef.current) spanRef.current.textContent = latest;
    });
  }, [rounded]);

  return (
    <span ref={spanRef} className={className}>
      0
    </span>
  );
}
