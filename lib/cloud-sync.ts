'use client';

import { supabase } from '@/lib/supabase';
import { useExamStore } from '@/store/useExamStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useTaxiExamStore } from '@/store/useTaxiExamStore';
import { useTaxiProgressStore } from '@/store/useTaxiProgressStore';

/**
 * Client-side sync of all locally-persisted study state to Supabase, so a
 * signed-in user's progress follows them across devices.
 *
 * The whole payload is stored as one JSON blob per user in `public.user_state`,
 * protected by Row Level Security (a user can only read/write their own row).
 * Strategy: pull on sign-in to hydrate the stores, then debounce-push on change.
 */

const TABLE = 'user_state';

/** One synced Zustand store: how to read its data out and write it back. */
interface SyncedSlice {
  key: string;
  collect: () => unknown;
  apply: (data: Record<string, unknown>) => void;
  subscribe: (listener: () => void) => () => void;
}

const SLICES: SyncedSlice[] = [
  {
    key: 'carProgress',
    collect: () => {
      const s = useProgressStore.getState();
      return {
        attempts: s.attempts,
        bookmarks: s.bookmarks,
        restudyQueue: s.restudyQueue,
        restudyLabel: s.restudyLabel,
        studySeconds: s.studySeconds,
      };
    },
    apply: (data) => useProgressStore.setState(data),
    subscribe: (listener) => useProgressStore.subscribe(listener),
  },
  {
    key: 'carExam',
    collect: () => {
      const s = useExamStore.getState();
      return { active: s.active, history: s.history };
    },
    apply: (data) => useExamStore.setState(data),
    subscribe: (listener) => useExamStore.subscribe(listener),
  },
  {
    key: 'taxiProgress',
    collect: () => {
      const s = useTaxiProgressStore.getState();
      return {
        attempts: s.attempts,
        bookmarks: s.bookmarks,
        restudyQueue: s.restudyQueue,
        restudyLabel: s.restudyLabel,
      };
    },
    apply: (data) => useTaxiProgressStore.setState(data),
    subscribe: (listener) => useTaxiProgressStore.subscribe(listener),
  },
  {
    key: 'taxiExam',
    collect: () => {
      const s = useTaxiExamStore.getState();
      return { active: s.active, history: s.history };
    },
    apply: (data) => useTaxiExamStore.setState(data),
    subscribe: (listener) => useTaxiExamStore.subscribe(listener),
  },
];

type Payload = Record<string, Record<string, unknown>>;

function collectAll(): Payload {
  return Object.fromEntries(SLICES.map((slice) => [slice.key, slice.collect() as Record<string, unknown>]));
}

/** Overwrite local store state from a remote payload (used on sign-in). */
function applyAll(payload: Payload | null | undefined): void {
  if (!payload) return;
  for (const slice of SLICES) {
    const data = payload[slice.key];
    if (data && typeof data === 'object') slice.apply(data);
  }
}

/**
 * Start syncing for a signed-in user. Returns a cleanup function.
 *
 * Pulls remote state first, hydrates the stores, then subscribes to every
 * store and pushes a debounced snapshot on change. Pushing is disabled until
 * the pull completes, so an empty local state never clobbers remote data.
 */
export function startCloudSync(userId: string): () => void {
  if (!supabase) return () => undefined;
  const client = supabase;

  let disposed = false;
  let readyToPush = false;
  let pushTimer: ReturnType<typeof setTimeout> | null = null;

  const push = () => {
    if (disposed) return;
    void client
      .from(TABLE)
      .upsert(
        { user_id: userId, data: collectAll(), updated_at: new Date().toISOString() },
        { onConflict: 'user_id' },
      )
      .then(({ error }) => {
        if (error) console.warn('[cloud-sync] push failed:', error.message);
      });
  };

  const schedulePush = () => {
    if (!readyToPush || disposed) return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(push, 1500);
  };

  // 1. Pull remote state, then enable pushing.
  void client
    .from(TABLE)
    .select('data')
    .eq('user_id', userId)
    .maybeSingle()
    .then(({ data, error }) => {
      if (disposed) return;
      if (error) console.warn('[cloud-sync] pull failed:', error.message);
      else applyAll(data?.data as Payload | undefined);
      readyToPush = true;
    });

  // 2. Push (debounced) on any store change.
  const unsubscribers = SLICES.map((slice) => slice.subscribe(schedulePush));

  return () => {
    disposed = true;
    if (pushTimer) clearTimeout(pushTimer);
    unsubscribers.forEach((unsub) => unsub());
  };
}
