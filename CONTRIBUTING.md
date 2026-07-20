# Contributing

Thanks for helping learners pass the Finnish theory exam. Contributions of all sizes are
welcome — a single corrected explanation is a genuinely useful pull request.

## Getting set up

```bash
npm install
npm run dev
```

Before opening a pull request, all three of these must pass:

```bash
npm run lint
npm run typecheck
npm test
```

## What is most useful

1. **New questions.** The bank is the heart of the app. See "Adding questions" below.
2. **Corrections to legal explanations.** Finnish traffic law changes; if something is out of
   date or wrong, please say so and cite the statute.
3. **Accessibility fixes.** Keyboard navigation, screen-reader labels, contrast.
4. **Translations.** The UI is currently English with Finnish category names.

## Adding questions

The app hosts two exam tracks with separate banks:

- [`data/questions.ts`](data/questions.ts) — B-license driving theory
- [`data/taxi-questions.ts`](data/taxi-questions.ts) — taxi driver qualification

- **Write the correct option first** (`correctAnswer: 0`). Option order is permuted
  deterministically at export time, so this convention costs nothing and keeps review easy.
- Use the id prefix matching the section or category. Driving theory: `th-` (theory),
  `hz-` (hazard perception), `rk-` (risk assessment). Taxi: `ts-` (safety and accessibility),
  `tl-` (legislation), `tc-` (customer service and navigation). Ids must be unique.
- Every question needs an `explanation` that says *why* the answer is correct — not just a
  restatement of it. Explain the alternatives where it helps.
- Include a reference wherever a statute governs the answer — `lawReference` in the driving
  theory bank, `reference` in the taxi bank — in the form `Tieliikennelaki 729/2018, 24 §` or
  `Laki liikenteen palveluista 320/2017, II osa 3 luku`. For questions grounded in training
  material rather than statute, reference that instead.
- Distractors must be plausible. An obviously silly option teaches nothing.
- Optionally attach a built-in SVG scene with `diagram` (see `DiagramKey` in `lib/types.ts`).

`npm test` enforces id uniqueness, option validity, explanation depth, answer-position
distribution, and that each exam section still has enough questions to fill a full exam.

### Accuracy bar

This app tells people what the law requires. Please do not add a question you are not confident
about. If you are unsure, open an issue instead of a pull request, or add the question with a
note in the PR description flagging the uncertainty — a reviewer can check it against the
statute.

Primary sources:

- [Tieliikennelaki 729/2018](https://www.finlex.fi/fi/laki/ajantasa/2018/20180729) — the Road Traffic Act
- [Laki liikenteen palveluista 320/2017](https://www.finlex.fi/fi/laki/ajantasa/2017/20170320) — the Act on Transport Services, governing taxi licensing and duties
- [Traficom](https://www.traficom.fi/) — the transport and communications agency

## Code style

- TypeScript `strict`; no `any` in new code.
- Match the surrounding code — this repo favours small, named, single-purpose components and
  pure functions in `lib/`.
- Keep exam rules in `lib/exam-config.ts` / `lib/taxi-config.ts` rather than hardcoding counts
  or limits in components.
- Shared components must stay track-agnostic: they render a `QuizQuestion` (`lib/quiz.ts`) and
  receive state through props. If you find yourself importing a track's store into
  `components/QuestionView.tsx` or `components/PracticeRunner.tsx`, add a binding component
  instead (see `CarPracticeRunner.tsx` / `TaxiPracticeRunner.tsx`).
- Components reading persisted Zustand state must guard against hydration mismatches with the
  `useHydrated()` hook.

## Commit and PR conventions

- Keep pull requests focused; question additions and refactors should be separate PRs.
- Describe the *why* in the PR body, and cite sources for any legal change.

## Reporting issues

When reporting a wrong answer or explanation, please include the question `id`, what the app
says, what you believe is correct, and your source. That makes the fix a two-minute job.
