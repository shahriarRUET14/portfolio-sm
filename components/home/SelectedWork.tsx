import Link from 'next/link';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import type { Project } from '@/content/types';
import { yearsSince } from '@/lib/dates';
import ProjectDiagram from '../diagrams/ProjectDiagram';
import { ArrowRight } from '../icons';
import SectionHeader from '../ui/SectionHeader';
import StatusBadge from '../ui/StatusBadge';
import { FigureRow, ProjectFacts } from '../work/ProjectFacts';

// Layouts rotate by position so reordering projects keeps the rhythm varied.
const layouts = ['feature', 'diagram-left', 'diagram-right', 'figure'] as const;
type Layout = (typeof layouts)[number];

export default function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="border-b border-line py-20 lg:py-32"
    >
      <div className="container-page">
        <SectionHeader
          id="work"
          index="01"
          label="Selected work"
          title="Systems where correctness, scale and tenancy matter."
          intro={
            <p>
              {projects.length} systems from {yearsSince(profile.careerStart)}+
              years of production work. Figures are real; internal details are
              generalised where they are confidential.
            </p>
          }
        />

        <ol className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <ProjectBlock
                project={project}
                number={String(i + 1).padStart(2, '0')}
                layout={layouts[i % layouts.length] ?? 'feature'}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectBlock({
  project,
  number,
  layout,
}: {
  project: Project;
  number: string;
  layout: Layout;
}) {
  const titleId = `${project.slug}-title`;
  const heroFigure = project.figures?.[0];

  return (
    <article aria-labelledby={titleId} data-reveal>
      <header className="grid gap-5 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
        <p className="label flex flex-wrap items-center gap-x-5 gap-y-2 lg:col-span-12">
          <span className="text-accent-ink">{number}</span>
          <span>{project.domain}</span>
          <span className="text-subtle">
            {project.company} · {project.period}
          </span>
          {project.status === 'in-progress' ? <StatusBadge /> : null}
        </p>
        <h3
          id={titleId}
          className={`font-display font-semibold lg:col-span-9 ${
            layout === 'feature'
              ? 'text-h2'
              : 'text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] leading-[1.08] tracking-[-0.03em]'
          }`}
        >
          {project.title}
        </h3>
        <p className="max-w-[62ch] text-lead text-muted lg:col-span-8">
          {project.summary}
        </p>
      </header>

      {layout === 'feature' ? (
        <div className="mt-10 space-y-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <ProjectDiagram type={project.diagram} />
            </div>
            <div className="lg:col-span-5">
              <ProjectFacts project={project} />
            </div>
          </div>
          {project.figures ? <FigureRow figures={project.figures} /> : null}
        </div>
      ) : null}

      {layout === 'diagram-left' || layout === 'diagram-right' ? (
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div
            className={`lg:col-span-6 ${
              layout === 'diagram-right' ? 'lg:order-2 lg:col-start-7' : ''
            }`}
          >
            <ProjectDiagram type={project.diagram} />
          </div>
          <div
            className={`lg:col-span-5 ${
              layout === 'diagram-left' ? 'lg:col-start-8' : 'lg:order-1'
            }`}
          >
            <ProjectFacts project={project} />
          </div>
        </div>
      ) : null}

      {layout === 'figure' ? (
        <div className="mt-10 space-y-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
            {heroFigure ? (
              <div className="lg:col-span-4">
                <p className="font-display text-[clamp(4.5rem,3rem+6vw,9rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-accent-ink">
                  {heroFigure.value}
                </p>
                <p className="mt-3 text-muted">{heroFigure.label}</p>
              </div>
            ) : null}
            <div className="lg:col-span-8">
              <ProjectFacts project={project} columns={2} />
            </div>
          </div>
          <ProjectDiagram type={project.diagram} />
        </div>
      ) : null}

      <footer className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[12px] leading-relaxed text-subtle">
          {project.stack.join(' / ')}
        </p>
        {project.caseStudy ? (
          <Link
            href={`/work/${project.slug}`}
            className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 font-medium text-fg"
          >
            <span className="link">Read the case study</span>
            <ArrowRight className="arrow text-accent-ink" />
            <span className="sr-only">: {project.title}</span>
          </Link>
        ) : null}
      </footer>
    </article>
  );
}
