'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getQuestionsByIds } from '@/data/questions';
import { EXAM_DURATION_SECONDS } from '@/lib/exam-config';
import { buildExam, gradeExam } from '@/lib/exam-logic';
import type { ExamResult } from '@/lib/types';

export interface ActiveExam {
  questionIds: string[];
  answers: Record<string, number | null>;
  flagged: string[];
  currentIndex: number;
  /** Epoch ms. Persisted so the countdown survives a reload or a closed tab. */
  startedAt: number;
  endsAt: number;
}

interface ExamState {
  active: ActiveExam | null;
  history: ExamResult[];

  startExam: () => void;
  answerQuestion: (questionId: string, optionIndex: number) => void;
  toggleFlag: (questionId: string) => void;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  /** Grades the active exam, stores the result and returns its id. */
  submitExam: () => string | null;
  abandonExam: () => void;
  getResult: (resultId: string) => ExamResult | undefined;
  clearHistory: () => void;
}

/** Seconds left on the active exam, derived from the persisted deadline. */
export function remainingSeconds(active: ActiveExam | null): number {
  if (!active) return 0;
  return Math.max(0, Math.round((active.endsAt - Date.now()) / 1000));
}

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      active: null,
      history: [],

      startExam: () => {
        const examQuestions = buildExam();
        const now = Date.now();
        set({
          active: {
            questionIds: examQuestions.map((q) => q.id),
            answers: Object.fromEntries(examQuestions.map((q) => [q.id, null])),
            flagged: [],
            currentIndex: 0,
            startedAt: now,
            endsAt: now + EXAM_DURATION_SECONDS * 1000,
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

      nextQuestion: () => get().goToQuestion((get().active?.currentIndex ?? 0) + 1),
      previousQuestion: () => get().goToQuestion((get().active?.currentIndex ?? 0) - 1),

      submitExam: () => {
        const { active, history } = get();
        if (!active) return null;

        const examQuestions = getQuestionsByIds(active.questionIds);
        const elapsed = Math.round((Date.now() - active.startedAt) / 1000);
        const result = gradeExam(
          examQuestions,
          active.answers,
          Math.min(elapsed, EXAM_DURATION_SECONDS),
        );

        set({ active: null, history: [result, ...history] });
        return result.id;
      },

      abandonExam: () => set({ active: null }),

      getResult: (resultId) => get().history.find((result) => result.id === resultId),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'ajokoe-exam',
      version: 1,
      partialize: (state) => ({ active: state.active, history: state.history }),
    },
  ),
);
