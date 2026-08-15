import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CarPracticeRunner } from "@/components/CarPracticeRunner";
import { getQuestionsByCategory } from '@/data/questions';
import { CATEGORIES, CATEGORY_BLURB, CATEGORY_FI, categoryFromSlug, categorySlug } from '@/lib/exam-config';

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: categorySlug(category) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) return { title: 'Topic not found' };

  return {
    title: `${category} (${CATEGORY_FI[category]})`,
    description: CATEGORY_BLURB[category],
  };
}

export default async function StudyCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) notFound();

  return (
    <CarPracticeRunner
      questions={getQuestionsByCategory(category)}
      title={CATEGORY_FI[category]}
      subtitle={`${category} — ${CATEGORY_BLURB[category]}`}
      backHref="/car/study"
      backLabel="Back to study hub"
    />
  );
}
