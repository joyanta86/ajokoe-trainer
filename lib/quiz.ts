import type { DiagramKey } from './types';

/**
 * The exam-agnostic shape the shared UI renders.
 *
 * Both tracks — the B-license theory exam and the taxi driver qualification —
 * project their domain questions onto this shape, so `QuestionView`,
 * `PracticeRunner` and `NavigationMatrix` stay free of either domain's rules.
 */
export interface QuizQuestion {
  id: string;
  question: string;
  /** Optional Finnish question text; when present the UI shows it as primary. */
  questionFi?: string;
  options: string[];
  /** Optional Finnish options, parallel to `options`. */
  optionsFi?: string[];
  correctAnswer: number;
  explanation: string;
  /** Optional Finnish explanation, shown alongside the English one. */
  explanationFi?: string;
  /** Statute or guideline the explanation rests on. */
  reference?: string;
  /** Primary badge, e.g. "Priority Rules" or "Legislation & Taxi Rules". */
  categoryLabel: string;
  /** Finnish name shown beside the category badge. */
  categoryNative?: string;
  /** Secondary badge, e.g. the exam section a question belongs to. */
  sectionLabel?: string;
  diagram?: DiagramKey;
}

/** Callback used by `PracticeRunner` to report a graded attempt upstream. */
export type AttemptRecorder = (questionId: string, isCorrect: boolean) => void;

/** Anything the navigation matrix can address. */
export interface Addressable {
  id: string;
}
