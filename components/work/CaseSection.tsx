import type { ReactNode } from 'react';

export default function CaseSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} data-reveal>
      <p className="font-mono text-label text-accent-ink">{number}</p>
      <h2
        id={`${id}-title`}
        className="mt-2 font-display text-h3 font-semibold"
      >
        {title}
      </h2>
      <div className="mt-6 text-[1.0625rem] leading-[1.75]">{children}</div>
    </section>
  );
}

export function BulletList({
  items,
  marker = 'line',
}: {
  items: string[];
  marker?: 'line' | 'accent';
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2">
          <span
            aria-hidden="true"
            className={`mt-[0.8em] h-px w-3 ${
              marker === 'accent' ? 'h-[3px] bg-accent' : 'bg-line-strong'
            }`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function OwnerNotes({ notes }: { notes: string[] }) {
  if (process.env.NODE_ENV !== 'development' || notes.length === 0) return null;
  return (
    <aside className="border border-dashed border-accent-ink/70 p-5 text-sm">
      <p className="label text-accent-ink">
        Owner input needed · visible in development only
      </p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </aside>
  );
}
