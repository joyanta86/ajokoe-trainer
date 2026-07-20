import type { TaxiCategory } from './taxi-types';

/**
 * Traficom taxi driver qualification exam parameters
 * (taksinkuljettajan ajolupakoe).
 *
 * A candidate passes only by reaching the pass mark in EVERY category
 * individually — falling short in a single category fails the whole exam.
 */
export const TAXI_EXAM_DURATION_SECONDS = 45 * 60;

/** Timer switches to its warning state at this many seconds remaining. */
export const TAXI_TIMER_WARNING_SECONDS = 5 * 60;

/** Questions drawn from each category in a full mock exam. */
export const TAXI_QUESTIONS_PER_CATEGORY = 10;

/** Minimum share of correct answers required in every category. */
export const TAXI_PASS_RATIO = 0.7;

export const TAXI_CATEGORIES: readonly TaxiCategory[] = [
  'Passenger Safety & Accessibility',
  'Legislation & Taxi Rules',
  'Customer Service & Navigation',
] as const;

export const TAXI_TOTAL_QUESTIONS = TAXI_CATEGORIES.length * TAXI_QUESTIONS_PER_CATEGORY;

/** Correct answers needed in a category of `total` questions. */
export function taxiPassMark(total: number): number {
  return Math.ceil(total * TAXI_PASS_RATIO);
}

export const TAXI_CATEGORY_FI: Record<TaxiCategory, string> = {
  'Passenger Safety & Accessibility': 'Turvallisuus, esteettömyys ja erityisryhmät',
  'Legislation & Taxi Rules': 'Lainsäädäntö ja ammattipätevyys',
  'Customer Service & Navigation': 'Asiakaspalvelu ja reitinvalinta',
};

export const TAXI_CATEGORY_BLURB: Record<TaxiCategory, string> = {
  'Passenger Safety & Accessibility':
    'Securing wheelchairs, assisting elderly and disabled passengers, emergency procedures and driver safety.',
  'Legislation & Taxi Rules':
    'The Transport Services Act, driver licensing, working hours, pricing transparency, receipts and official documents.',
  'Customer Service & Navigation':
    'Professional conduct, handling conflicts, route selection and taxi stand rules.',
};

/** URL slug for a taxi category, e.g. "legislation-taxi-rules". */
export function taxiCategorySlug(category: TaxiCategory): string {
  return category
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Resolve a URL slug back to a taxi category, or `undefined` if unknown. */
export function taxiCategoryFromSlug(slug: string): TaxiCategory | undefined {
  return TAXI_CATEGORIES.find((category) => taxiCategorySlug(category) === slug);
}
