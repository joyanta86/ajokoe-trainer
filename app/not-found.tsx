import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-400">404</p>
      <h1 className="mt-2 text-2xl font-bold text-ink-900">Page not found</h1>
      <p className="mt-2 text-sm text-ink-600">
        That road does not lead anywhere. Head back to the dashboard and pick a topic.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
      >
        <Home size={16} aria-hidden />
        Back to dashboard
      </Link>
    </div>
  );
}
