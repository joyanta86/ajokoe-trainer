import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { TaxiPracticeRunner } from '@/components/TaxiPracticeRunner';
import { getTaxiQuestionsByCategory } from '@/data/taxi-questions';
import {
  TAXI_CATEGORIES,
  TAXI_CATEGORY_BLURB,
  TAXI_CATEGORY_FI,
  taxiCategoryFromSlug,
  taxiCategorySlug,
} from '@/lib/taxi-config';

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return TAXI_CATEGORIES.map((category) => ({ category: taxiCategorySlug(category) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = taxiCategoryFromSlug(slug);
  if (!category) return { title: 'Category not found' };

  return {
    title: `${category} (${TAXI_CATEGORY_FI[category]})`,
    description: TAXI_CATEGORY_BLURB[category],
  };
}

export default async function TaxiStudyCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = taxiCategoryFromSlug(slug);
  if (!category) notFound();

  return (
    <TaxiPracticeRunner
      questions={getTaxiQuestionsByCategory(category)}
      title={category}
      subtitle={`${TAXI_CATEGORY_FI[category]} — ${TAXI_CATEGORY_BLURB[category]}`}
      backHref="/taxi/study"
      backLabel="Back to taxi study hub"
    />
  );
}
