'use client';

import { useEffect, useState } from 'react';

/**
 * Zustand's `persist` middleware rehydrates after the first client render, so
 * server HTML and the first client render must both show the pre-hydration
 * state. Gate any persisted-state UI on this flag to avoid mismatches.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

/** Re-renders once per second while `enabled`, for countdown displays. */
export function useTicker(enabled: boolean): number {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [enabled]);

  return tick;
}
