/**
 * Domain types for the Traficom taxi driver qualification track
 * (taksinkuljettajan ajolupakoe).
 */

export type TaxiCategory =
  | 'Passenger Safety & Accessibility'
  | 'Legislation & Taxi Rules'
  | 'Customer Service & Navigation';

export interface TaxiQuestion {
  id: string;
  category: TaxiCategory;
  question: string;
  options: string[];
  /** 0-based index into `options`. */
  correctAnswer: number;
  explanation: string;
  /** Statute or Traficom guideline the explanation rests on. */
  reference?: string;
}

export interface TaxiCategoryScore {
  correct: number;
  total: number;
  /** Whether this category alone cleared the 70 % threshold. */
  isPassed: boolean;
}

export interface TaxiExamResult {
  id: string;
  date: string;
  categoryScores: Record<TaxiCategory, TaxiCategoryScore>;
  /** True only when every category passed. */
  isPassed: boolean;
  incorrectQuestionIds: string[];
  /** Seconds actually spent on the exam. */
  durationSeconds: number;
  /** The exact question ids served, in order, for full result replay. */
  questionIds: string[];
  /** Answer given per question id (`null` = left blank). */
  answers: Record<string, number | null>;
}
