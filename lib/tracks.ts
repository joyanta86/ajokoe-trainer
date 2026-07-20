/**
 * The app hosts two independent Traficom exam tracks that share the same quiz
 * machinery. This module is the single place that knows what they are called
 * and where they live, so navigation stays consistent.
 */

export type TrackId = 'car' | 'taxi';

export interface TrackNavItem {
  key: 'dashboard' | 'study' | 'exam' | 'bookmarks';
  href: string;
  label: string;
}

export interface Track {
  id: TrackId;
  name: string;
  shortName: string;
  nativeName: string;
  basePath: string;
  description: string;
  nav: TrackNavItem[];
}

export const TRACKS: readonly Track[] = [
  {
    id: 'car',
    name: 'B-license theory exam',
    shortName: 'Car',
    nativeName: 'Ajokorttiteoriakoe · B-luokka',
    basePath: '/car',
    description:
      '70 questions in 30 minutes, graded against the official per-section error allowances.',
    nav: [
      { key: 'dashboard', href: '/car', label: 'Dashboard' },
      { key: 'study', href: '/car/study', label: 'Study' },
      { key: 'exam', href: '/car/exam', label: 'Mock exam' },
      { key: 'bookmarks', href: '/car/bookmarks', label: 'Bookmarks' },
    ],
  },
  {
    id: 'taxi',
    name: 'Taxi driver qualification',
    shortName: 'Taxi',
    nativeName: 'Taksinkuljettajan ajolupakoe',
    basePath: '/taxi',
    description:
      '30 questions in 45 minutes, requiring at least 70 % correct in every category.',
    nav: [
      { key: 'dashboard', href: '/taxi', label: 'Dashboard' },
      { key: 'study', href: '/taxi/study', label: 'Study' },
      { key: 'exam', href: '/taxi/exam', label: 'Mock exam' },
      { key: 'bookmarks', href: '/taxi/bookmarks', label: 'Bookmarks' },
    ],
  },
] as const;

/** Which track a pathname belongs to, or `undefined` on the landing page. */
export function trackForPathname(pathname: string): Track | undefined {
  return TRACKS.find(
    (track) => pathname === track.basePath || pathname.startsWith(`${track.basePath}/`),
  );
}
