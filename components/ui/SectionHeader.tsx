import type { ReactNode } from 'react';

type SectionHeaderProps = {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
};

export default function SectionHeader({
  id,
  index,
  label,
  title,
  intro,
}: SectionHeaderProps) {
  return (
    <header className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-6">
      <p className="label flex items-center gap-3 lg:col-span-12">
        <span className="text-accent-ink">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        <span>{label}</span>
      </p>
      <h2
        id={`${id}-title`}
        className="font-display text-h2 font-semibold lg:col-span-7"
      >
        {title}
      </h2>
      {intro ? (
        <div className="max-w-prose text-lead text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
          {intro}
        </div>
      ) : null}
    </header>
  );
}
