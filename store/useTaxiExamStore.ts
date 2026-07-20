'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getTaxiQuestionsByIds } from '@/data/taxi-questions';
import { TAXI_EXAM_DURATION_SECONDS } from '@/lib/taxi-config';
import { buildTaxiExam, gradeTaxiExam } from '@/lib/taxi-logic';
import type { TaxiExamResult } from '@/lib/taxi-types';

export interface ActiveTaxiExam {
  questionIds: string[];
  answers: Record<string, number | null>;
  flagged: string[];
  currentIndex: number;
  /** Epoch ms. Persisted so the countdown survives a reload or a closed tab. */
  startedAt: number;
  endsAt: number;
}

interface TaxiExamState {
  active: ActiveTaxiExam | null;
  history: TaxiExamResult[];

  startExam: () => void;
  answerQuestion: (questionId: string, optionIndex: number) => void;
  toggleFlag: (questionId: string) => void;
  goToQuestion: (index: number) => void;
  /** Grades the active exam, stores the result and returns its id. */
  submitExam: () => string | null;
  abandonExam: () => void;
  clearHistory: () => void;
}

/** Seconds left on the active taxi exam, derived from the persisted deadline. */
export function taxiRemainingSeconds(active: ActiveTaxiExam | null): number {
  if (!active) return 0;
  return Math.max(0, Math.round((active.endsAt - Date.now()) / 1000));
}

export const useTaxiExamStore = create<TaxiExamState>()(
  persist(
    (set, get) => ({
      active: null,
      history: [],

      startExam: () => {
        const examQuestions = buildTaxiExam();
        const now = Date.now();
        set({
          active: {
            questionIds: examQuestions.map((question) => question.id),
            answers: Object.fromEntries(examQuestions.map((question) => [question.id, null])),
            flagged: [],
            currentIndex: 0,
            startedAt: now,
            endsAt: now + TAXI_EXAM_DURATION_SECONDS * 1000,
          },
        });
      },

      answerQuestion: (questionId, optionIndex) =>
        set((state) =>
          state.active
            ? {
                active: {
                  ...state.active,
                  answers: { ...state.active.answers, [questionId]: optionIndex },
                },
              }
            : state,
        ),

      toggleFlag: (questionId) =>
        set((state) =>
          state.active
            ? {
                active: {
                  ...state.active,
                  flagged: state.active.flagged.includes(questionId)
                    ? state.active.flagged.filter((id) => id !== questionId)
                    : [...state.active.flagged, questionId],
                },
              }
            : state,
        ),

      goToQuestion: (index) =>
        set((state) =>
          state.active
            ? {
                active: {
                  ...state.active,
                  currentIndex: Math.min(
                    Math.max(0, index),
                    Math.max(0, state.active.questionIds.length - 1),
                  ),
                },
              }
            : state,
        ),

      submitExam: () => {
        const { active, history } = get();
        if (!active) return null;

        const examQuestions = getTaxiQuestionsByIds(active.questionIds);
        const elapsed = Math.round((Date.now() - active.startedAt) / 1000);
        const result = gradeTaxiExam(
          examQuestions,
          active.answers,
          Math.min(elapsed, TAXI_EXAM_DURATION_SECONDS),
        );

        set({ active: null, history: [result, ...history] });
        return result.id;
      },

      abandonExam: () => set({ active: null }),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'taksi-exam',
      version: 1,
      partialize: (state) => ({ active: state.active, history: state.history }),
    },
  ),
);
