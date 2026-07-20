import type { QuestionCategory, QuestionType } from './types';

/**
 * Traficom B-license theory exam parameters.
 *
 * A candidate passes only if the error count stays at or below the allowed
 * limit in EVERY section simultaneously — exceeding the limit in a single
 * section fails the whole exam.
 */
export const EXAM_DURATION_SECONDS = 30 * 60;

/** Timer switches to its warning state at this many seconds remaining. */
export const TIMER_WARNING_SECONDS = 5 * 60;

export interface SectionConfig {
  type: QuestionType;
  label: string;
  shortLabel: string;
  count: number;
  allowedErrors: number;
  description: string;
}

export const EXAM_SECTIONS: readonly SectionConfig[] = [
  {
    type: 'theory',
    label: 'Theory / Multiple Choice',
    shortLabel: 'Theory',
    count: 15,
    allowedErrors: 3,
    description: 'Rules of the road, signage and legal obligations.',
  },
  {
    type: 'hazard_perception',
    label: 'Hazard Perception / Situations',
    shortLabel: 'Hazard',
    count: 50,
    allowedErrors: 8,
    description: 'Reading traffic situations and anticipating developing risk.',
  },
  {
    type: 'risk_assessment',
    label: 'Risk Assessment / Safety',
    shortLabel: 'Risk',
    count: 5,
    allowedErrors: 1,
    description: 'Self-assessment, attitude and safety-critical judgement.',
  },
] as const;

export const TOTAL_QUESTIONS = EXAM_SECTIONS.reduce((sum, s) => sum + s.count, 0);

export const CATEGORIES: readonly QuestionCategory[] = [
  'Traffic Signs',
  'Priority Rules',
  'Hazardous Conditions',
  'Situation Hazards',
  'Vehicle Tech',
] as const;

/** Finnish names shown alongside the English category labels. */
export const CATEGORY_FI: Record<QuestionCategory, string> = {
  'Traffic Signs': 'Liikennemerkit',
  'Priority Rules': 'Väistämissäännöt',
  'Hazardous Conditions': 'Liikenneturvallisuus & Ympäristö',
  'Situation Hazards': 'Vaaratilanteet',
  'Vehicle Tech': 'Ajoneuvotekniikka',
};

export const CATEGORY_BLURB: Record<QuestionCategory, string> = {
  'Traffic Signs': 'Warning, priority, prohibition and information signs plus road markings.',
  'Priority Rules': 'Right-hand rule, yield signs, trams, roundabouts and turning conflicts.',
  'Hazardous Conditions': 'Winter driving, darkness, weather, eco-driving and fitness to drive.',
  'Situation Hazards': 'Identifying developing risks in real traffic scenes.',
  'Vehicle Tech': 'Tyres, brakes, lights, loading and mandatory safety equipment.',
};

/** URL slug for a category, e.g. "Traffic Signs" -> "traffic-signs". */
export function categorySlug(category: QuestionCategory): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

/** Resolve a URL slug back to a category, or `undefined` if unknown. */
export function categoryFromSlug(slug: string): QuestionCategory | undefined {
  return CATEGORIES.find((category) => categorySlug(category) === slug);
}

export const SECTION_BY_TYPE: Record<QuestionType, SectionConfig> = EXAM_SECTIONS.reduce(
  (acc, section) => {
    acc[section.type] = section;
    return acc;
  },
  {} as Record<QuestionType, SectionConfig>,
);
