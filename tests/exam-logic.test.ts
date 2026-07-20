import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getQuestionsByType, questions } from '@/data/questions';
import { EXAM_SECTIONS } from '@/lib/exam-config';
import {
  buildExam,
  computeReadinessIndex,
  gradeExam,
  identifyWeakSpots,
} from '@/lib/exam-logic';
import type { Question } from '@/lib/types';

const exam = buildExam();
const wrongAnswerFor = (question: Question) =>
  (question.correctAnswer + 1) % question.options.length;

/** Answers for the whole exam with a fixed error budget spent per section. */
function answersWithErrors(theory: number, hazard: number, risk: number) {
  const budget: Record<string, number> = {
    theory,
    hazard_perception: hazard,
    risk_assessment: risk,
  };

  return Object.fromEntries(
    exam.map((question) => {
      if (budget[question.type] > 0) {
        budget[question.type] -= 1;
        return [question.id, wrongAnswerFor(question)];
      }
      return [question.id, question.correctAnswer];
    }),
  );
}

describe('question bank integrity', () => {
  it('has unique ids and at least 25 seed questions', () => {
    const ids = questions.map((q) => q.id);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(questions.length >= 25);
  });

  it('has a valid, well-explained answer for every question', () => {
    for (const question of questions) {
      assert.ok(question.options.length >= 2, `${question.id}: needs options`);
      assert.equal(
        new Set(question.options).size,
        question.options.length,
        `${question.id}: duplicate options`,
      );
      assert.ok(
        question.correctAnswer >= 0 && question.correctAnswer < question.options.length,
        `${question.id}: correctAnswer out of range`,
      );
      assert.ok(question.explanation.length > 40, `${question.id}: explanation too thin`);
    }
  });

  it('does not put the correct answer in a predictable position', () => {
    const positions = new Map<number, number>();
    for (const question of questions) {
      positions.set(question.correctAnswer, (positions.get(question.correctAnswer) ?? 0) + 1);
    }
    assert.ok(positions.size >= 3, 'answers must be spread across positions');
    assert.ok(
      (positions.get(0) ?? 0) < questions.length * 0.5,
      'no single position may hold half the answers',
    );
  });

  it('holds enough questions to fill every exam section', () => {
    for (const section of EXAM_SECTIONS) {
      assert.ok(
        getQuestionsByType(section.type).length >= section.count,
        `${section.type}: not enough questions`,
      );
    }
  });
});

describe('exam assembly', () => {
  it('builds 70 questions in the Traficom 15 / 50 / 5 split', () => {
    assert.equal(exam.length, 70);
    for (const section of EXAM_SECTIONS) {
      assert.equal(exam.filter((q) => q.type === section.type).length, section.count);
    }
  });

  it('never repeats a question within one exam', () => {
    assert.equal(new Set(exam.map((q) => q.id)).size, exam.length);
  });
});

describe('grading against Traficom criteria', () => {
  it('passes a perfect paper with full section scores', () => {
    const result = gradeExam(
      exam,
      Object.fromEntries(exam.map((q) => [q.id, q.correctAnswer])),
      900,
    );
    assert.equal(result.isPassed, true);
    assert.equal(result.scoreTheory, 15);
    assert.equal(result.scoreHazard, 50);
    assert.equal(result.scoreRisk, 5);
    assert.equal(result.incorrectQuestionIds.length, 0);
  });

  it('counts unanswered questions as errors', () => {
    const result = gradeExam(exam, Object.fromEntries(exam.map((q) => [q.id, null])), 1800);
    assert.equal(result.isPassed, false);
    assert.equal(result.incorrectQuestionIds.length, 70);
  });

  it('passes when every section sits exactly on its limit', () => {
    assert.equal(gradeExam(exam, answersWithErrors(3, 8, 1), 1200).isPassed, true);
  });

  it('fails when any single section exceeds its limit', () => {
    assert.equal(gradeExam(exam, answersWithErrors(4, 0, 0), 1200).isPassed, false, 'theory');
    assert.equal(gradeExam(exam, answersWithErrors(0, 9, 0), 1200).isPassed, false, 'hazard');
    assert.equal(gradeExam(exam, answersWithErrors(0, 0, 2), 1200).isPassed, false, 'risk');
  });
});

describe('readiness index and weak spots', () => {
  const perfect = gradeExam(
    exam,
    Object.fromEntries(exam.map((q) => [q.id, q.correctAnswer])),
    900,
  );
  const blank = gradeExam(exam, Object.fromEntries(exam.map((q) => [q.id, null])), 1800);

  it('is 0 with no exam history', () => {
    assert.equal(computeReadinessIndex([], []), 0);
  });

  it('reaches 100 only with a perfect exam and full bank coverage', () => {
    assert.equal(
      computeReadinessIndex([perfect], questions.map((q) => q.id)),
      100,
    );
    assert.ok(computeReadinessIndex([perfect], []) < 100, 'coverage must matter');
  });

  it('stays low after a failed paper', () => {
    assert.ok(computeReadinessIndex([blank], []) < 20);
  });

  it('finds no weak spots in a perfect exam and flags them all in a blank one', () => {
    assert.equal(identifyWeakSpots(perfect).length, 0);
    const weak = identifyWeakSpots(blank);
    assert.ok(weak.length > 0);
    assert.ok(weak.every((entry) => entry.percentage === 0));
  });
});
