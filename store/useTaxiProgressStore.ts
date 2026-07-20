'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TaxiQuestionAttempt {
  correct: number;
  incorrect: number;
  /** Whether the most recent attempt was correct — drives the "mastered" flag. */
  lastCorrect: boolean;
  lastSeen: string;
}

interface TaxiProgressState {
  attempts: Record<string, TaxiQuestionAttempt>;
  bookmarks: string[];
  /** Question ids queued by the weakness plan generator for targeted re-study. */
  restudyQueue: string[];
  restudyLabel: string;

  recordAttempt: (questionId: string, isCorrect: boolean) => void;
  recordManyAttempts: (entries: Array<{ questionId: string; isCorrect: boolean }>) => void;
  toggleBookmark: (questionId: string) => void;
  setRestudyQueue: (questionIds: string[], label: string) => void;
  clearRestudyQueue: () => void;
  resetProgress: () => void;
}

const applyAttempt = (
  attempts: Record<string, TaxiQuestionAttempt>,
  questionId: string,
  isCorrect: boolean,
): Record<string, TaxiQuestionAttempt> => {
  const previous = attempts[questionId] ?? {
    correct: 0,
    incorrect: 0,
    lastCorrect: false,
    lastSeen: '',
  };

  return {
    ...attempts,
    [questionId]: {
      correct: previous.correct + (isCorrect ? 1 : 0),
      incorrect: previous.incorrect + (isCorrect ? 0 : 1),
      lastCorrect: isCorrect,
      lastSeen: new Date().toISOString(),
    },
  };
};

export const useTaxiProgressStore = create<TaxiProgressState>()(
  persist(
    (set) => ({
      attempts: {},
      bookmarks: [],
      restudyQueue: [],
      restudyLabel: '',

      recordAttempt: (questionId, isCorrect) =>
        set((state) => ({ attempts: applyAttempt(state.attempts, questionId, isCorrect) })),

      recordManyAttempts: (entries) =>
        set((state) => ({
          attempts: entries.reduce(
            (acc, entry) => applyAttempt(acc, entry.questionId, entry.isCorrect),
            state.attempts,
          ),
        })),

      toggleBookmark: (questionId) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(questionId)
            ? state.bookmarks.filter((id) => id !== questionId)
            : [...state.bookmarks, questionId],
        })),

      setRestudyQueue: (questionIds, label) =>
        set({ restudyQueue: questionIds, restudyLabel: label }),

      clearRestudyQueue: () => set({ restudyQueue: [], restudyLabel: '' }),

      resetProgress: () =>
        set({ attempts: {}, bookmarks: [], restudyQueue: [], restudyLabel: '' }),
    }),
    {
      name: 'taksi-progress',
      version: 1,
    },
  ),
);
