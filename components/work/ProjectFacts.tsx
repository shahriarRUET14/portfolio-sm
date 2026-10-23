import type { Figure, Project } from '@/content/types';

export function ProjectFacts({
  project,
  columns = 1,
}: {
  project: Project;
  columns?: 1 | 2 | 4;
}) {
  const facts = [
    { term: 'Context', detail: project.context },
    { term: 'Challenge', detail: project.challenge },
    { term: 'My role', detail: project.role },
    { term: 'Outcome', detail: project.outcome },
  ];
  const grid =
    columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : columns === 2
      ? 'sm:grid-cols-2'
      : '';

  return (
    <dl className={`grid gap-x-6 gap-y-6 ${grid}`}>
      {facts.map((fact) => (
        <div key={fact.term} className="border-t border-line pt-3">
          <dt className="label text-subtle">{fact.term}</dt>
          <dd className="mt-2 text-[15px] leading-relaxed">{fact.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export function FigureRow({ figures }: { figures: Figure[] }) {
  return (
    <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4">
      {figures.map((figure, i) => (
        <div
          key={figure.label}
          className={`flex flex-col-reverse justify-end gap-2 py-5 ${
            i % 2 === 1 ? 'border-l border-line pl-4' : 'pr-4'
          } ${i > 1 ? 'border-t border-line md:border-t-0' : ''} ${
            i === 2 ? 'md:border-l md:pl-4' : ''
          }`}
        >
          <dt className="text-sm text-muted">{figure.label}</dt>
          <dd className="font-display text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-semibold leading-none tracking-[-0.03em]">
            {figure.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
