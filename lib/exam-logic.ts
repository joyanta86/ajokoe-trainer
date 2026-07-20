import { getQuestionsByIds, getQuestionsByType, questions } from '@/data/questions';
import { CATEGORIES, CATEGORY_FI, EXAM_SECTIONS, SECTION_BY_TYPE } from '@/lib/exam-config';
import type { QuizQuestion } from '@/lib/quiz';
import type {
  CategoryScore,
  ExamResult,
  Question,
  QuestionCategory,
  SectionBreakdown,
} from '@/lib/types';

/** Project a B-license question onto the exam-agnostic shape the UI renders. */
export function toQuizQuestion(question: Question): QuizQuestion {
  return {
    id: question.id,
    question: question.question,
    options: question.options,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    reference: question.lawReference,
    categoryLabel: question.category,
    categoryNative: CATEGORY_FI[question.category],
    sectionLabel: SECTION_BY_TYPE[question.type].shortLabel,
    diagram: question.diagram,
  };
}

/** Fisher–Yates shuffle on a copy of the input. */
export function shuffle<T>(input: readonly T[]): T[] {
  const out = [...input];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Assemble a full mock exam: 15 theory + 50 hazard perception + 5 risk
 * assessment, ordered section by section as in the real Traficom test.
 *
 * If the bank holds fewer questions than a section requires, every available
 * question of that type is used — the grader scales the allowed errors to the
 * questions actually served, so the exam stays consistent.
 */
export function buildExam(): Question[] {
  return EXAM_SECTIONS.flatMap((section) =>
    shuffle(getQuestionsByType(section.type)).slice(0, section.count),
  );
}

/** A shorter practice exam drawn from a single category. */
export function buildPracticeSet(category: QuestionCategory, size = 10): Question[] {
  return shuffle(questions.filter((q) => q.category === category)).slice(0, size);
}

function emptyCategoryScores(): Record<QuestionCategory, CategoryScore> {
  return CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = { correct: 0, total: 0 };
      return acc;
    },
    {} as Record<QuestionCategory, CategoryScore>,
  );
}

/**
 * Per-section breakdown against the Traficom error allowances.
 * A blank answer counts as an error, exactly as in the official exam.
 */
export function computeSectionBreakdown(
  examQuestions: Question[],
  answers: Record<string, number | null>,
): SectionBreakdown[] {
  return EXAM_SECTIONS.map((section) => {
    const inSection = examQuestions.filter((q) => q.type === section.type);
    const correct = inSection.filter((q) => answers[q.id] === q.correctAnswer).length;
    const errors = inSection.length - correct;

    return {
      type: section.type,
      label: section.label,
      total: inSection.length,
      correct,
      errors,
      allowedErrors: section.allowedErrors,
      passed: errors <= section.allowedErrors,
    };
  });
}

/**
 * Grade a finished exam.
 *
 * Passing requires staying within the allowed error count in EVERY section
 * simultaneously — exceeding it in any one section fails the whole exam.
 */
export function gradeExam(
  examQuestions: Question[],
  answers: Record<string, number | null>,
  durationSeconds: number,
): ExamResult {
  const breakdown = computeSectionBreakdown(examQuestions, answers);
  const categoryScores = emptyCategoryScores();
  const incorrectQuestionIds: string[] = [];

  for (const question of examQuestions) {
    const isCorrect = answers[question.id] === question.correctAnswer;
    categoryScores[question.category].total += 1;
    if (isCorrect) {
      categoryScores[question.category].correct += 1;
    } else {
      incorrectQuestionIds.push(question.id);
    }
  }

  const sectionScore = (type: string) => breakdown.find((b) => b.type === type)?.correct ?? 0;

  return {
    id: `exam-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
    scoreTheory: sectionScore('theory'),
    scoreHazard: sectionScore('hazard_perception'),
    scoreRisk: sectionScore('risk_assessment'),
    isPassed: breakdown.every((section) => section.passed),
    categoryScores,
    incorrectQuestionIds,
    durationSeconds,
    questionIds: examQuestions.map((q) => q.id),
    answers,
  };
}

/** Rebuild the section breakdown from a stored result, for the report page. */
export function breakdownFromResult(result: ExamResult): SectionBreakdown[] {
  return computeSectionBreakdown(getQuestionsByIds(result.questionIds), result.answers);
}

export interface CategoryStrength {
  category: QuestionCategory;
  correct: number;
  total: number;
  percentage: number;
}

/** Category strength meters, sorted weakest first. */
export function computeCategoryStrength(result: ExamResult): CategoryStrength[] {
  return CATEGORIES.map((category) => {
    const { correct, total } = result.categoryScores[category];
    return {
      category,
      correct,
      total,
      percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
    };
  })
    .filter((entry) => entry.total > 0)
    .sort((a, b) => a.percentage - b.percentage);
}

/** The weakest categories, used to seed the automated re-study plan. */
export function identifyWeakSpots(result: ExamResult, limit = 3): CategoryStrength[] {
  return computeCategoryStrength(result)
    .filter((entry) => entry.percentage < 100)
    .slice(0, limit);
}

/**
 * Official Test Readiness Index (0–100).
 *
 * Blends three signals, so a single lucky exam cannot produce a high score:
 *   60 % — accuracy across the most recent exams (recent ones weighted higher)
 *   25 % — pass rate across those exams
 *   15 % — coverage: how much of the question bank has been attempted
 */
export function computeReadinessIndex(
  history: ExamResult[],
  attemptedQuestionIds: string[],
): number {
  if (history.length === 0) return 0;

  const recent = [...history]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  let weightedCorrect = 0;
  let weightedTotal = 0;

  recent.forEach((result, index) => {
    // Most recent exam carries the highest weight.
    const weight = recent.length - index;
    const total = Object.values(result.categoryScores).reduce((sum, s) => sum + s.total, 0);
    const correct = Object.values(result.categoryScores).reduce((sum, s) => sum + s.correct, 0);
    if (total === 0) return;
    weightedCorrect += (correct / total) * weight;
    weightedTotal += weight;
  });

  const accuracy = weightedTotal === 0 ? 0 : weightedCorrect / weightedTotal;
  const passRate = recent.filter((r) => r.isPassed).length / recent.length;
  const coverage = Math.min(1, new Set(attemptedQuestionIds).size / questions.length);

  return Math.round((accuracy * 0.6 + passRate * 0.25 + coverage * 0.15) * 100);
}

export function readinessVerdict(index: number): {
  label: string;
  tone: 'danger' | 'warning' | 'good' | 'excellent';
} {
  if (index >= 85) return { label: 'Ready to book the official exam', tone: 'excellent' };
  if (index >= 70) return { label: 'Nearly ready — close the remaining gaps', tone: 'good' };
  if (index >= 45) return { label: 'Keep practising before booking', tone: 'warning' };
  return { label: 'Not ready — focus on the fundamentals', tone: 'danger' };
}

/** `mm:ss` for the countdown timer. */
export function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function formatExamDate(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Human-readable section label, e.g. for the exam header. */
export function sectionLabelFor(question: Question): string {
  return SECTION_BY_TYPE[question.type].shortLabel;
}
