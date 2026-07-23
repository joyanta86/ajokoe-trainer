import {
  getTaxiQuestionsByCategory,
  getTaxiQuestionsByIds,
  taxiQuestions,
} from '@/data/taxi-questions';
import type { QuizQuestion } from '@/lib/quiz';
import {
  TAXI_CATEGORIES,
  TAXI_CATEGORY_FI,
  TAXI_QUESTIONS_PER_CATEGORY,
  taxiPassMark,
} from '@/lib/taxi-config';
import type {
  TaxiCategory,
  TaxiCategoryScore,
  TaxiExamResult,
  TaxiQuestion,
} from '@/lib/taxi-types';

/** Project a taxi question onto the exam-agnostic shape the UI renders. */
export function toQuizQuestion(question: TaxiQuestion): QuizQuestion {
  return {
    id: question.id,
    question: question.question,
    questionFi: question.questionFi,
    options: question.options,
    optionsFi: question.optionsFi,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    explanationFi: question.explanationFi,
    reference: question.reference,
    categoryLabel: question.category,
    categoryNative: TAXI_CATEGORY_FI[question.category],
  };
}

/** Fisher–Yates shuffle on a copy of the input. */
function shuffle<T>(input: readonly T[]): T[] {
  const out = [...input];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Assemble a full taxi mock exam: 10 questions from each of the three
 * categories, grouped category by category.
 *
 * If a category holds fewer questions than required, every available question is
 * used — the grader derives the pass mark from the questions actually served.
 */
export function buildTaxiExam(): TaxiQuestion[] {
  return TAXI_CATEGORIES.flatMap((category) =>
    shuffle(getTaxiQuestionsByCategory(category)).slice(0, TAXI_QUESTIONS_PER_CATEGORY),
  );
}

/** A practice set drawn from a single taxi category. */
export function buildTaxiPracticeSet(category: TaxiCategory, size = 10): TaxiQuestion[] {
  return shuffle(getTaxiQuestionsByCategory(category)).slice(0, size);
}

/**
 * Grade a finished taxi exam.
 *
 * Passing requires reaching the 70 % pass mark in EVERY category — falling short
 * in a single category fails the whole exam.
 */
export function gradeTaxiExam(
  examQuestions: TaxiQuestion[],
  answers: Record<string, number | null>,
  durationSeconds: number,
): TaxiExamResult {
  const categoryScores = {} as Record<TaxiCategory, TaxiCategoryScore>;
  const incorrectQuestionIds: string[] = [];

  for (const category of TAXI_CATEGORIES) {
    const inCategory = examQuestions.filter((question) => question.category === category);
    const correct = inCategory.filter(
      (question) => answers[question.id] === question.correctAnswer,
    ).length;

    categoryScores[category] = {
      correct,
      total: inCategory.length,
      // A category with no questions served cannot fail the candidate.
      isPassed: inCategory.length === 0 || correct >= taxiPassMark(inCategory.length),
    };
  }

  for (const question of examQuestions) {
    if (answers[question.id] !== question.correctAnswer) {
      incorrectQuestionIds.push(question.id);
    }
  }

  return {
    id: `taxi-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
    categoryScores,
    isPassed: TAXI_CATEGORIES.every((category) => categoryScores[category].isPassed),
    incorrectQuestionIds,
    durationSeconds,
    questionIds: examQuestions.map((question) => question.id),
    answers,
  };
}

export interface TaxiCategoryStrength {
  category: TaxiCategory;
  correct: number;
  total: number;
  percentage: number;
  isPassed: boolean;
  passMark: number;
}

/** Category strength meters for the report, sorted weakest first. */
export function computeTaxiCategoryStrength(result: TaxiExamResult): TaxiCategoryStrength[] {
  return TAXI_CATEGORIES.map((category) => {
    const { correct, total, isPassed } = result.categoryScores[category];
    return {
      category,
      correct,
      total,
      percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
      isPassed,
      passMark: taxiPassMark(total),
    };
  })
    .filter((entry) => entry.total > 0)
    .sort((a, b) => a.percentage - b.percentage);
}

/** The weakest categories, used to seed the automated re-study plan. */
export function identifyTaxiWeakSpots(result: TaxiExamResult, limit = 3): TaxiCategoryStrength[] {
  return computeTaxiCategoryStrength(result)
    .filter((entry) => entry.percentage < 100)
    .slice(0, limit);
}

/**
 * Taxi Driver Readiness Index (0–100).
 *
 * Mirrors the B-license index so the two tracks read alike:
 *   60 % — accuracy across the most recent exams (recent ones weighted higher)
 *   25 % — pass rate across those exams
 *   15 % — coverage: how much of the question bank has been attempted
 */
export function computeTaxiReadinessIndex(
  history: TaxiExamResult[],
  attemptedQuestionIds: string[],
): number {
  if (history.length === 0) return 0;

  const recent = [...history]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  let weightedCorrect = 0;
  let weightedTotal = 0;

  recent.forEach((result, index) => {
    const weight = recent.length - index;
    const scores = Object.values(result.categoryScores);
    const total = scores.reduce((sum, score) => sum + score.total, 0);
    const correct = scores.reduce((sum, score) => sum + score.correct, 0);
    if (total === 0) return;
    weightedCorrect += (correct / total) * weight;
    weightedTotal += weight;
  });

  const accuracy = weightedTotal === 0 ? 0 : weightedCorrect / weightedTotal;
  const passRate = recent.filter((result) => result.isPassed).length / recent.length;
  const coverage = Math.min(1, new Set(attemptedQuestionIds).size / taxiQuestions.length);

  return Math.round((accuracy * 0.6 + passRate * 0.25 + coverage * 0.15) * 100);
}

export function taxiReadinessVerdict(index: number): {
  label: string;
  tone: 'danger' | 'warning' | 'good' | 'excellent';
} {
  if (index >= 85) return { label: 'Ready for the official Traficom exam', tone: 'excellent' };
  if (index >= 70) return { label: 'Nearly ready — close the remaining gaps', tone: 'good' };
  if (index >= 45) return { label: 'Keep practising before booking', tone: 'warning' };
  return { label: 'Not ready — focus on the fundamentals', tone: 'danger' };
}

/** Rebuild the graded questions from a stored result, for the report page. */
export function taxiQuestionsFromResult(result: TaxiExamResult): TaxiQuestion[] {
  return getTaxiQuestionsByIds(result.questionIds);
}
