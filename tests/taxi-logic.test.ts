import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getTaxiQuestionsByCategory, taxiQuestions } from '@/data/taxi-questions';
import {
  TAXI_CATEGORIES,
  TAXI_QUESTIONS_PER_CATEGORY,
  TAXI_TOTAL_QUESTIONS,
  taxiCategoryFromSlug,
  taxiCategorySlug,
  taxiPassMark,
} from '@/lib/taxi-config';
import {
  buildTaxiExam,
  computeTaxiCategoryStrength,
  computeTaxiReadinessIndex,
  gradeTaxiExam,
  identifyTaxiWeakSpots,
} from '@/lib/taxi-logic';
import type { TaxiCategory, TaxiQuestion } from '@/lib/taxi-types';

const exam = buildTaxiExam();
const wrongAnswerFor = (question: TaxiQuestion) =>
  (question.correctAnswer + 1) % question.options.length;

/** Answers for the whole exam with a fixed number of errors per category. */
function answersWithErrors(errorsByCategory: Partial<Record<TaxiCategory, number>>) {
  const budget: Record<string, number> = { ...errorsByCategory };

  return Object.fromEntries(
    exam.map((question) => {
      if ((budget[question.category] ?? 0) > 0) {
        budget[question.category] -= 1;
        return [question.id, wrongAnswerFor(question)];
      }
      return [question.id, question.correctAnswer];
    }),
  );
}

describe('taxi question bank integrity', () => {
  it('has unique ids and at least 25 seed questions', () => {
    const ids = taxiQuestions.map((q) => q.id);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(taxiQuestions.length >= 25);
  });

  it('has a valid, well-explained answer for every question', () => {
    for (const question of taxiQuestions) {
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

  it('is fully bilingual: Finnish present and parallel to the English', () => {
    for (const question of taxiQuestions) {
      assert.ok(question.questionFi.length > 0, `${question.id}: missing questionFi`);
      assert.ok(question.explanationFi.length > 40, `${question.id}: explanationFi too thin`);
      assert.equal(
        question.optionsFi.length,
        question.options.length,
        `${question.id}: optionsFi length must match options`,
      );
      assert.ok(
        question.optionsFi.every((option) => option.length > 0),
        `${question.id}: empty Finnish option`,
      );
    }
  });

  it('does not put the correct answer in a predictable position', () => {
    const positions = new Map<number, number>();
    for (const question of taxiQuestions) {
      positions.set(question.correctAnswer, (positions.get(question.correctAnswer) ?? 0) + 1);
    }
    assert.ok(positions.size >= 3, 'answers must be spread across positions');
    assert.ok(
      (positions.get(0) ?? 0) < taxiQuestions.length * 0.5,
      'no single position may hold half the answers',
    );
  });

  it('holds enough questions in every category to fill an exam', () => {
    for (const category of TAXI_CATEGORIES) {
      assert.ok(
        getTaxiQuestionsByCategory(category).length >= TAXI_QUESTIONS_PER_CATEGORY,
        `${category}: not enough questions`,
      );
    }
  });

  it('round-trips every category through its URL slug', () => {
    for (const category of TAXI_CATEGORIES) {
      assert.equal(taxiCategoryFromSlug(taxiCategorySlug(category)), category);
    }
    assert.equal(taxiCategoryFromSlug('not-a-category'), undefined);
  });
});

describe('taxi exam assembly', () => {
  it('builds 30 questions, 10 from each category', () => {
    assert.equal(exam.length, TAXI_TOTAL_QUESTIONS);
    for (const category of TAXI_CATEGORIES) {
      assert.equal(
        exam.filter((q) => q.category === category).length,
        TAXI_QUESTIONS_PER_CATEGORY,
      );
    }
  });

  it('never repeats a question within one exam', () => {
    assert.equal(new Set(exam.map((q) => q.id)).size, exam.length);
  });
});

describe('taxi grading against the 70 % per-category rule', () => {
  it('requires 7 correct out of 10', () => {
    assert.equal(taxiPassMark(10), 7);
  });

  it('passes a perfect paper', () => {
    const result = gradeTaxiExam(
      exam,
      Object.fromEntries(exam.map((q) => [q.id, q.correctAnswer])),
      1500,
    );
    assert.equal(result.isPassed, true);
    assert.equal(result.incorrectQuestionIds.length, 0);
    for (const category of TAXI_CATEGORIES) {
      assert.equal(result.categoryScores[category].correct, TAXI_QUESTIONS_PER_CATEGORY);
      assert.equal(result.categoryScores[category].isPassed, true);
    }
  });

  it('counts unanswered questions as errors', () => {
    const result = gradeTaxiExam(exam, Object.fromEntries(exam.map((q) => [q.id, null])), 2700);
    assert.equal(result.isPassed, false);
    assert.equal(result.incorrectQuestionIds.length, TAXI_TOTAL_QUESTIONS);
  });

  it('passes when every category sits exactly on the pass mark', () => {
    const atLimit = answersWithErrors({
      'Passenger Safety & Accessibility': 3,
      'Legislation & Taxi Rules': 3,
      'Customer Service & Navigation': 3,
    });
    const result = gradeTaxiExam(exam, atLimit, 2000);
    assert.equal(result.isPassed, true, '7/10 in each category must pass');
  });

  it('fails the whole exam when a single category drops below 70 %', () => {
    for (const category of TAXI_CATEGORIES) {
      const result = gradeTaxiExam(exam, answersWithErrors({ [category]: 4 }), 2000);
      assert.equal(result.isPassed, false, `${category} at 6/10 must fail the exam`);
      assert.equal(result.categoryScores[category].isPassed, false);

      // The other categories are untouched and still pass individually.
      for (const other of TAXI_CATEGORIES.filter((c) => c !== category)) {
        assert.equal(result.categoryScores[other].isPassed, true);
      }
    }
  });
});

describe('taxi readiness index and weak spots', () => {
  const perfect = gradeTaxiExam(
    exam,
    Object.fromEntries(exam.map((q) => [q.id, q.correctAnswer])),
    1500,
  );
  const blank = gradeTaxiExam(exam, Object.fromEntries(exam.map((q) => [q.id, null])), 2700);

  it('is 0 with no exam history', () => {
    assert.equal(computeTaxiReadinessIndex([], []), 0);
  });

  it('reaches 100 only with a perfect exam and full bank coverage', () => {
    assert.equal(
      computeTaxiReadinessIndex([perfect], taxiQuestions.map((q) => q.id)),
      100,
    );
    assert.ok(computeTaxiReadinessIndex([perfect], []) < 100, 'coverage must matter');
  });

  it('stays low after a failed paper', () => {
    assert.ok(computeTaxiReadinessIndex([blank], []) < 20);
  });

  it('reports category strength weakest-first with the pass mark attached', () => {
    const result = gradeTaxiExam(
      exam,
      answersWithErrors({ 'Legislation & Taxi Rules': 5 }),
      2000,
    );
    const strengths = computeTaxiCategoryStrength(result);
    assert.equal(strengths[0].category, 'Legislation & Taxi Rules');
    assert.equal(strengths[0].passMark, 7);
    assert.equal(strengths[0].isPassed, false);
  });

  it('finds no weak spots in a perfect exam and flags them all in a blank one', () => {
    assert.equal(identifyTaxiWeakSpots(perfect).length, 0);
    const weak = identifyTaxiWeakSpots(blank);
    assert.equal(weak.length, TAXI_CATEGORIES.length);
    assert.ok(weak.every((entry) => entry.percentage === 0));
  });
});
