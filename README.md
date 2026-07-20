# Ajokoe Trainer

> Free, open-source practice and mock-exam simulator for two Finnish Traficom exams:
> the **B-license driving theory exam** (*ajokorttiteoriakoe*) and the
> **taxi driver qualification** (*taksinkuljettajan ajolupakoe*).

Study by topic with instant, law-referenced explanations, sit a realistic timed mock exam,
and get an automated weak-spot analysis with a one-click targeted re-study quiz.

Everything runs client-side. There is no backend, no account and no tracking — your
progress lives in your browser's `localStorage`, kept separately for each track.

---

## The two tracks

| | Driving theory (`/car`) | Taxi qualification (`/taxi`) |
| --- | --- | --- |
| Finnish name | Ajokorttiteoriakoe · B-luokka | Taksinkuljettajan ajolupakoe |
| Time limit | 30 minutes | 45 minutes |
| Questions | 70 | 30 |
| Structure | 3 sections with error allowances | 3 categories × 10 questions |
| Pass criterion | Within the allowed errors in **every** section | At least **70 %** in **every** category |
| Question bank | 80 | 36 |

Both are graded strictly: falling short in a **single** section or category fails the whole
exam, regardless of how strong the rest is.

### Driving theory exam structure

| Section | Questions | Max errors |
| --- | ---: | ---: |
| Theory / Multiple choice | 15 | 3 |
| Hazard perception / Situations | 50 | 8 |
| Risk assessment / Safety | 5 | 1 |
| **Total** | **70** | — |

### Taxi qualification structure

| Category | Finnish | Questions | Min correct |
| --- | --- | ---: | ---: |
| Passenger Safety & Accessibility | Turvallisuus, esteettömyys ja erityisryhmät | 10 | 7 |
| Legislation & Taxi Rules | Lainsäädäntö ja ammattipätevyys | 10 | 7 |
| Customer Service & Navigation | Asiakaspalvelu ja reitinvalinta | 10 | 7 |
| **Total** | | **30** | 70 % each |

## Features

Both tracks share the same feature set, backed by their own question bank, rules and stored
progress.

**Dashboard & learning hub**
- Topic/category progress tracking with percentage progress bars
- Practice mode with instant answer validation and a detailed explanation for every question,
  each citing its basis in Finnish law (*Tieliikennelaki 729/2018*,
  *Laki liikenteen palveluista 320/2017*) or Traficom guidance
- Bookmark / flag system to collect tricky questions for a focused review session

**Exam simulator**
- Distraction-free, high-contrast exam interface (site navigation is hidden during the exam)
- Strict countdown with an amber warning state at 5 minutes and a critical state in the final minute
- Auto-submits the moment time expires; unanswered questions count as errors
- Interactive navigation matrix: jump to any question, see answered/unanswered status, flag for review, submit
- The timer is anchored to a persisted deadline, so reloading or closing the tab does not lose the exam

**Smart diagnostics & weak-spot analysis**
- Instant pass/fail banner with a per-section (car) or per-category (taxi) verdict
- Full criteria breakdown: allowed vs. actual errors, or score vs. pass mark
- Category strength meters, weakest first
- Automated weakness plan that generates a **Targeted Re-Study Quiz** from exactly the
  questions you missed, launchable in one click
- **Readiness Index** — a 0–100 metric blending recent accuracy, pass rate and bank coverage

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript, `strict` mode |
| Styling | Tailwind CSS v4 |
| Icons | Lucide |
| State | Zustand with `persist` middleware (localStorage) |
| Tests | Node's built-in test runner via `tsx` |

## Getting started

```bash
git clone https://github.com/<your-username>/ajokoe-trainer.git
cd ajokoe-trainer
npm install
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Exam logic and question-bank integrity tests for both tracks |

### Deployment

The app is fully static apart from the result pages and deploys anywhere Next.js runs.
On [Vercel](https://vercel.com), import the repository and accept the defaults — no
environment variables are required.

## Project structure

```
app/
  page.tsx              Landing page — choose a track
  car/                  B-license theory track
    page.tsx            Dashboard: readiness index, topic progress, exam history
    study/              Study hub and per-category practice
    exam/               Briefing and the distraction-free simulator (exam/run)
    results/[id]/       Post-exam diagnostic report
    review/             Targeted re-study quiz
    bookmarks/          Flagged-question review session
  taxi/                 Taxi qualification track — same shape, taxi rules

components/             Shared, track-agnostic UI
  QuestionView.tsx      Renders any QuizQuestion
  PracticeRunner.tsx    Practice session; receives its store via props
  CarPracticeRunner.tsx / TaxiPracticeRunner.tsx   Track-specific bindings
  NavigationMatrix.tsx, ExamTimer.tsx, RoadDiagram.tsx

lib/
  quiz.ts               QuizQuestion — the shape the shared UI renders
  tracks.ts             Track registry: names, base paths, navigation
  types.ts              B-license domain types
  exam-config.ts        Sections, error allowances, categories
  exam-logic.ts         Exam assembly, grading, readiness index, weak spots
  taxi-types.ts         Taxi domain types
  taxi-config.ts        Categories, 45-minute limit, 70 % pass mark
  taxi-logic.ts         Taxi assembly, grading, readiness index, weak spots
  question-utils.ts     Deterministic per-question option shuffling (both tracks)

data/
  questions.ts          B-license question bank (80)
  taxi-questions.ts     Taxi question bank (36)

store/                  Zustand stores, persisted per track
tests/                  Logic and data-integrity tests for both tracks
```

### How the tracks share code

The exam machinery is identical; only the rules differ. Both banks project their questions
onto a single `QuizQuestion` shape (`lib/quiz.ts`) via a `toQuizQuestion` adapter, so
`QuestionView`, `PracticeRunner` and `NavigationMatrix` contain no domain rules at all. Each
track keeps its own config, grading logic and persisted stores, which is what lets the pass
criteria differ so completely without either track leaking into the other.

## Adding questions

Both banks use the same convention: **the correct option is written first**
(`correctAnswer: 0`), which keeps the source easy to review. Option order is then permuted
deterministically at export time by `withDeterministicOptionOrder`, seeded from the question
id — so the answer position is not predictable to a learner, is stable across reloads, and is
identical on server and client (no hydration mismatch).

```ts
{
  id: 'tl-13',
  category: 'Legislation & Taxi Rules',
  question: 'Your question text?',
  options: [
    'The correct answer, written first',
    'A plausible distractor',
    'Another plausible distractor',
    'A fourth option',
  ],
  correctAnswer: 0,
  explanation: 'Why this is correct, and why the alternatives are not.',
  reference: 'Laki liikenteen palveluista 320/2017, II osa 3 luku',
}
```

Run `npm test` afterwards — the suite checks id uniqueness, option validity, explanation depth,
answer-position distribution, and that every section or category still has enough questions to
fill a full exam.

### Diagrams

Situation/hazard questions in the driving theory track can reference a built-in SVG road scene
via the optional `diagram` field (see `DiagramKey` in `lib/types.ts`). The scenes are drawn
inline in `components/RoadDiagram.tsx`, so the app stays fully offline and free of third-party
image licensing.

## Contributing

Contributions are welcome — especially additional questions and corrections to legal
explanations. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Disclaimer

This is an independent study tool. It is **not affiliated with, endorsed by, or an official
product of Traficom**. Question content is written for practice and is grounded in Finnish
statutes and Traficom guidance, but legislation changes and exam formats are revised — always
verify against the current statute and official Traficom material before your exam. The
structures and pass criteria implemented here model the official exams and may differ from the
exam you sit.

## License

[MIT](LICENSE)
