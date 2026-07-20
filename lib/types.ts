/**
 * Core domain types for the Finnish (Traficom) driving theory trainer.
 *
 * These types are re-exported from `@/data/questions` so that a consumer can
 * import both the schema and the seed data from a single module.
 */

export type QuestionCategory =
  | 'Traffic Signs'
  | 'Priority Rules'
  | 'Hazardous Conditions'
  | 'Situation Hazards'
  | 'Vehicle Tech';

export type QuestionType = 'theory' | 'hazard_perception' | 'risk_assessment';

/** Identifier for a built-in, dependency-free SVG road diagram. */
export type DiagramKey =
  | 'uncontrolled-intersection'
  | 'roundabout'
  | 'tram-crossing'
  | 'pedestrian-crossing'
  | 'motorway-merge'
  | 'narrow-winter-road'
  | 'sign-yield'
  | 'sign-priority-road';

export interface Question {
  id: string;
  category: QuestionCategory;
  type: QuestionType;
  question: string;
  /** Optional external image. Prefer `diagram` for offline, license-free visuals. */
  imageUrl?: string;
  /** Optional built-in SVG diagram rendered by `<RoadDiagram />`. */
  diagram?: DiagramKey;
  options: string[];
  /** 0-based index into `options`. */
  correctAnswer: number;
  explanation: string;
  /** Reference to the Finnish statute the explanation is grounded in. */
  lawReference?: string;
}

export interface CategoryScore {
  correct: number;
  total: number;
}

export interface ExamResult {
  id: string;
  date: string;
  /** Correct answers out of 15 theory questions. */
  scoreTheory: number;
  /** Correct answers out of 50 hazard-perception questions. */
  scoreHazard: number;
  /** Correct answers out of 5 risk-assessment questions. */
  scoreRisk: number;
  isPassed: boolean;
  categoryScores: Record<QuestionCategory, CategoryScore>;
  incorrectQuestionIds: string[];
  /** Seconds actually spent on the exam. */
  durationSeconds: number;
  /** The exact question ids served, in order, for full result replay. */
  questionIds: string[];
  /** Answer given per question id (`null` = left blank). */
  answers: Record<string, number | null>;
}

/** Per-section outcome used by the Traficom criteria breakdown table. */
export interface SectionBreakdown {
  type: QuestionType;
  label: string;
  total: number;
  correct: number;
  errors: number;
  allowedErrors: number;
  passed: boolean;
}
