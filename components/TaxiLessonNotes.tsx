'use client';

import { BookText, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import type { TaxiLesson } from '@/lib/taxi-lessons';

export function TaxiLessonNotes({ lesson }: { lesson: TaxiLesson }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Card className="mb-6">
      <CardHeader
        title="Study notes"
        subtitle="Read before you practise — a quick primer on this category, in Finnish and English."
        icon={<BookText size={18} aria-hidden />}
      />
      <CardBody className="space-y-4">
        <p className="text-sm text-ink-900">{lesson.introFi}</p>
        <p className="text-sm text-ink-500">{lesson.intro}</p>

        <div className="divide-y divide-ink-100 rounded-xl border border-ink-100">
          {lesson.sections.map((section, index) => {
            const open = openIndex === index;
            return (
              <div key={section.heading}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                  aria-expanded={open}
                >
                  <span>
                    <span className="block text-sm font-semibold text-ink-900">
                      {section.headingFi}
                    </span>
                    <span className="block text-xs text-ink-500">{section.heading}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden
                    className={`shrink-0 text-ink-400 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                {open ? (
                  <ul className="space-y-3 px-4 pb-4">
                    {section.points.map((point, pointIndex) => (
                      <li key={point} className="text-sm">
                        <p className="text-ink-700">{section.pointsFi[pointIndex]}</p>
                        <p className="mt-0.5 text-xs text-ink-500">{point}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
