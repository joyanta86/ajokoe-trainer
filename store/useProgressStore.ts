'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuestionAttempt {
  correct: number;
  incorrect: number;
  /** Whether the most recent attempt was correct — drives the "mastered" flag. */
  lastCorrect: boolean;
  lastSeen: string;
}

interface ProgressState {
  attempts: Record<string, QuestionAttempt>;
  bookmarks: string[];
  /** Question ids queued by the weakness plan generator for targeted re-study. */
  restudyQueue: string[];
  restudyLabel: string;
  /** Cumulative seconds spent in study and exam sessions. */
  studySeconds: number;

  recordAttempt: (questionId: string, isCorrect: boolean) => void;
  recordManyAttempts: (entries: Array<{ questionId: string; isCorrect: boolean }>) => void;
  toggleBookmark: (questionId: string) => void;
  isBookmarked: (questionId: string) => boolean;
  setRestudyQueue: (questionIds: string[], label: string) => void;
  clearRestudyQueue: () => void;
  addStudyTime: (seconds: number) => void;
  resetProgress: () => void;
}

const applyAttempt = (
  attempts: Record<string, QuestionAttempt>,
  questionId: string,
  isCorrect: boolean,
): Record<string, QuestionAttempt> => {
  const previous = attempts[questionId] ?? { correct: 0, incorrect: 0, lastCorrect: false, lastSeen: '' };
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

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      attempts: {},
      bookmarks: [],
      restudyQueue: [],
      restudyLabel: '',
      studySeconds: 0,

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

      isBookmarked: (questionId) => get().bookmarks.includes(questionId),

      setRestudyQueue: (questionIds, label) =>
        set({ restudyQueue: questionIds, restudyLabel: label }),

      clearRestudyQueue: () => set({ restudyQueue: [], restudyLabel: '' }),

      addStudyTime: (seconds) => set((state) => ({ studySeconds: state.studySeconds + seconds })),

      resetProgress: () =>
        set({ attempts: {}, bookmarks: [], restudyQueue: [], restudyLabel: '', studySeconds: 0 }),
    }),
    {
      name: 'ajokoe-progress',
      version: 1,
    },
  ),
);
