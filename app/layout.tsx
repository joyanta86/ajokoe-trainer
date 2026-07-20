import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SiteHeader } from '@/components/SiteHeader';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Ajokoe Trainer — Finnish Driving Theory & Taxi Qualification Exams',
    template: '%s · Ajokoe Trainer',
  },
  description:
    'Free, open-source practice and mock exam simulator for the Finnish (Traficom) B-license driving theory test and the taxi driver qualification exam.',
  keywords: [
    'ajokoe',
    'teoriakoe',
    'Traficom',
    'Finnish driving theory',
    'B-license',
    'taksinkuljettajan ajolupa',
    'taxi driver exam',
  ],
  openGraph: {
    title: 'Ajokoe Trainer — Finnish Driving Theory & Taxi Qualification Exams',
    description:
      'Practise the Finnish B-license theory exam and the Traficom taxi driver qualification with realistic timed mock tests and automated weak-spot analysis.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink-50 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <footer className="mt-16 border-t border-ink-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-ink-500 sm:px-6">
            <p className="font-medium text-ink-700">Ajokoe Trainer</p>
            <p className="mt-1 max-w-3xl">
              An independent open-source study tool. Not affiliated with or endorsed by Traficom.
              Question content is written for practice and is grounded in Finnish statutes
              (Tieliikennelaki 729/2018, Laki liikenteen palveluista 320/2017) and Traficom
              guidance; always verify against the current statute and official Traficom material
              before your exam.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
