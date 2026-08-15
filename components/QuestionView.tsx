'use client';

import { Bookmark, BookmarkCheck, Check, Scale, X } from 'lucide-react';
import { motion } from 'motion/react';

import { RoadDiagram } from '@/components/RoadDiagram';
import type { QuizQuestion } from '@/lib/quiz';
import { cn } from '@/lib/utils';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

interface QuestionViewProps {
  question: QuizQuestion;
  selected: number | null;
  onSelect: (optionIndex: number) => void;
  /** When true, correct/incorrect styling and the explanation are shown. */
  revealed: boolean;
  bookmarked?: boolean;
  onToggleBookmark?: () => void;
  /** e.g. "Question 12 of 70" */
  positionLabel?: string;
  disabled?: boolean;
}

export function QuestionView({
  question,
  selected,
  onSelect,
  revealed,
  bookmarked = false,
  onToggleBookmark,
  positionLabel,
  disabled = false,
}: QuestionViewProps) {
  const isCorrectChoice = selected === question.correctAnswer;

  return (
    <article className="rounded-2xl border border-ink-200 bg-surface shadow-sm">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          {positionLabel ? (
            <span className="text-sm font-semibold text-ink-900">{positionLabel}</span>
          ) : null}
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-400">
            {question.categoryLabel}
          </span>
          {question.categoryNative ? (
            <span className="hidden text-xs text-ink-500 sm:inline">{question.categoryNative}</span>
          ) : null}
          {question.sectionLabel ? (
            <span className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-600">
              {question.sectionLabel}
            </span>
          ) : null}
        </div>

        {onToggleBookmark ? (
          <button
            type="button"
            onClick={onToggleBookmark}
            aria-pressed={bookmarked}
            className={cn(
              'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors',
              bookmarked
                ? 'border-amber-300 bg-amber-50 text-amber-700'
                : 'border-ink-200 text-ink-600 hover:bg-white/5',
            )}
          >
            {bookmarked ? <BookmarkCheck size={14} aria-hidden /> : <Bookmark size={14} aria-hidden />}
            {bookmarked ? 'Flagged' : 'Flag question'}
          </button>
        ) : null}
      </header>

      <div className="px-5 py-5">
        {/* Finnish is the language of the real exam, so it leads; English follows in muted text. */}
        <h2 className="text-lg font-semibold leading-snug text-ink-900">
          {question.questionFi ?? question.question}
        </h2>
        {question.questionFi ? (
          <p className="mt-1 text-sm leading-snug text-ink-500">{question.question}</p>
        ) : null}

        {question.diagram ? (
          <RoadDiagram diagram={question.diagram} className="mt-4 max-w-md" />
        ) : null}

        <ul className="mt-5 space-y-2.5">
          {question.options.map((option, index) => {
            const isSelected = selected === index;
            const isAnswer = index === question.correctAnswer;
            const showCorrect = revealed && isAnswer;
            const showWrong = revealed && isSelected && !isAnswer;
            const optionFi = question.optionsFi?.[index];

            return (
              <li key={option}>
                <button
                  type="button"
                  disabled={disabled || revealed}
                  onClick={() => onSelect(index)}
                  aria-pressed={isSelected}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition-all duration-200',
                    'disabled:cursor-default active:not-disabled:scale-[0.99]',
                    showCorrect && 'border-emerald-500/60 bg-emerald-500/10',
                    showWrong && 'border-rose-500/60 bg-rose-500/10',
                    !revealed && isSelected && 'border-brand-600 bg-brand-50',
                    !revealed &&
                      !isSelected &&
                      'border-ink-200 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50/40 hover:shadow-sm',
                    revealed && !showCorrect && !showWrong && 'border-ink-200 opacity-70',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold',
                      showCorrect && 'bg-emerald-600 text-white',
                      showWrong && 'bg-rose-600 text-white',
                      !revealed && isSelected && 'bg-brand-600 text-white',
                      !revealed && !isSelected && 'bg-ink-100 text-ink-600',
                      revealed && !showCorrect && !showWrong && 'bg-ink-100 text-ink-500',
                    )}
                  >
                    {showCorrect ? (
                      <Check size={14} aria-hidden />
                    ) : showWrong ? (
                      <X size={14} aria-hidden />
                    ) : (
                      LETTERS[index]
                    )}
                  </span>
                  <span className="pt-0.5">
                    <span className="block text-ink-800">{optionFi ?? option}</span>
                    {optionFi ? <span className="mt-0.5 block text-ink-400">{option}</span> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {revealed ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'mt-5 rounded-xl border-l-4 p-4',
              isCorrectChoice
                ? 'border-emerald-500 bg-emerald-500/10'
                : 'border-rose-500 bg-rose-500/10',
            )}
          >
            <p className="text-sm font-semibold text-ink-900">
              {isCorrectChoice ? 'Correct' : selected === null ? 'Not answered' : 'Incorrect'}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
              {question.explanationFi ?? question.explanation}
            </p>
            {question.explanationFi ? (
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{question.explanation}</p>
            ) : null}
            {question.reference ? (
              <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-ink-500">
                <Scale size={13} aria-hidden />
                {question.reference}
              </p>
            ) : null}
          </motion.div>
        ) : null}
      </div>
    </article>
  );
}
