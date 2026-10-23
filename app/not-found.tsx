import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <p className="label text-accent-ink">404 — Not found</p>
      <h1 className="mt-5 max-w-[18ch] font-display text-h1 font-semibold">
        This route doesn&apos;t resolve to anything.
      </h1>
      <p className="mt-6 max-w-prose text-lead text-muted">
        The page may have moved, or the link may be mistyped.
      </p>
      <Link href="/" className="btn-secondary mt-10 self-start">
        <ArrowLeft className="arrow" /> Back to the homepage
      </Link>
    </section>
  );
}
