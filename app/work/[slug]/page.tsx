import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectDiagram from '@/components/diagrams/ProjectDiagram';
import { ArrowLeft, ArrowRight } from '@/components/icons';
import JsonLd from '@/components/seo/JsonLd';
import StatusBadge from '@/components/ui/StatusBadge';
import CaseSection, {
  BulletList,
  OwnerNotes,
} from '@/components/work/CaseSection';
import { FigureRow } from '@/components/work/ProjectFacts';
import { profile } from '@/content/profile';
import { caseStudies, getProject } from '@/content/projects';
import { caseStudySchema } from '@/lib/structured-data';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getProject(slug)?.caseStudy;
  if (!caseStudy) return {};

  const path = `/work/${slug}`;
  return {
    title: caseStudy.seoTitle,
    description: caseStudy.seoDescription,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      siteName: profile.name,
      locale: 'en_US',
      title: caseStudy.seoTitle,
      description: caseStudy.seoDescription,
      authors: [profile.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.seoTitle,
      description: caseStudy.seoDescription,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  const study = project?.caseStudy;
  if (!project || !study) notFound();

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'contribution', title: 'My contribution and the team’s' },
    { id: 'requirements', title: 'Requirements & constraints' },
    { id: 'architecture', title: 'Architecture' },
    { id: 'decisions', title: 'Key decisions' },
    study.reliability && {
      id: 'reliability',
      title: 'Reliability & performance',
    },
    study.security && { id: 'security', title: 'Security & access control' },
    study.delivery && { id: 'delivery', title: 'Testing & delivery' },
    { id: 'outcomes', title: 'Outcomes' },
    { id: 'tradeoffs', title: 'Trade-offs & lessons' },
  ].filter((section): section is { id: string; title: string } =>
    Boolean(section)
  );
  const numberOf = (id: string) =>
    String(sections.findIndex((section) => section.id === id) + 1).padStart(
      2,
      '0'
    );
  const titleOf = (id: string) =>
    sections.find((section) => section.id === id)?.title ?? '';

  const position = caseStudies.findIndex((item) => item.slug === slug);
  const next = caseStudies[(position + 1) % caseStudies.length];

  const meta = [
    { term: 'Company', detail: project.company },
    { term: 'Period', detail: project.period },
    { term: 'Domain', detail: project.domain },
    { term: 'Stack', detail: project.stack.join(', ') },
  ];

  return (
    <article>
      <JsonLd data={caseStudySchema(project)} />

      <header className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="container-page pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
        >
          <div className="grid-guides h-full border-x border-line/40" />
        </div>

        <div className="container-page relative pb-14 pt-8 lg:pb-20 lg:pt-12">
          <nav aria-label="Breadcrumb">
            <ol className="label flex flex-wrap items-center gap-2 text-subtle">
              <li>
                <Link href="/" className="hover:text-fg">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#work" className="hover:text-fg">
                  Selected work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-muted">
                Case study
              </li>
            </ol>
          </nav>

          <p className="label enter mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 lg:mt-16">
            <span className="text-accent-ink">Case study</span>
            <span>{project.domain}</span>
            {project.status === 'in-progress' ? <StatusBadge /> : null}
          </p>
          <h1 className="mt-5 max-w-[22ch] font-display text-h1 font-semibold">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-lead text-muted">
            {project.summary}
          </p>

          <dl className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.term} className="bg-bg px-4 py-4">
                <dt className="label text-subtle">{item.term}</dt>
                <dd className="mt-1.5 text-sm">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {project.figures && project.figures.length > 1 ? (
        <div className="container-page pt-10">
          <FigureRow figures={project.figures} />
        </div>
      ) : null}

      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:gap-6 lg:py-24">
        <nav
          aria-label="On this page"
          className="hidden lg:col-span-3 lg:block"
        >
          <div className="sticky top-24">
            <p className="label text-subtle">On this page</p>
            <ol className="mt-4 space-y-2 text-sm">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex gap-3 text-muted hover:text-fg"
                  >
                    <span className="font-mono text-[11px] text-subtle group-hover:text-accent-ink">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="space-y-16 lg:col-span-8 lg:col-start-5 lg:space-y-20">
          {study.ownerNotes ? <OwnerNotes notes={study.ownerNotes} /> : null}

          <CaseSection
            id="overview"
            number={numberOf('overview')}
            title={titleOf('overview')}
          >
            <div className="prose-body">
              {study.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 border-l-2 border-accent-ink pl-4 font-display text-xl font-semibold leading-snug tracking-[-0.015em]">
              <span className="label mb-2 block text-subtle">
                The challenge
              </span>
              {project.challenge}
            </p>
          </CaseSection>

          <CaseSection
            id="contribution"
            number={numberOf('contribution')}
            title={titleOf('contribution')}
          >
            <h3 className="label text-subtle">What I owned</h3>
            <div className="mt-4">
              <BulletList items={study.contribution.mine} marker="accent" />
            </div>
            <h3 className="label mt-8 text-subtle">The team</h3>
            <p className="mt-3 text-muted">{study.contribution.team}</p>
          </CaseSection>

          <CaseSection
            id="requirements"
            number={numberOf('requirements')}
            title={titleOf('requirements')}
          >
            <BulletList items={study.requirements} />
          </CaseSection>

          <CaseSection
            id="architecture"
            number={numberOf('architecture')}
            title={titleOf('architecture')}
          >
            <div className="prose-body">
              {study.architecture.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <ProjectDiagram type={project.diagram} />
            </div>
          </CaseSection>

          <CaseSection
            id="decisions"
            number={numberOf('decisions')}
            title={titleOf('decisions')}
          >
            <ol className="divide-y divide-line border-y border-line">
              {study.decisions.map((decision, i) => (
                <li key={decision.title} className="py-6">
                  <h3 className="flex gap-3 font-display text-lg font-semibold tracking-[-0.015em]">
                    <span className="pt-1 font-mono text-[11px] font-normal text-accent-ink">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {decision.title}
                  </h3>
                  <p className="mt-2 pl-6 text-muted">{decision.why}</p>
                  {decision.tradeoff ? (
                    <p className="mt-3 pl-6 text-sm">
                      <span className="label mr-2 text-subtle">Trade-off</span>
                      {decision.tradeoff}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </CaseSection>

          {study.reliability ? (
            <CaseSection
              id="reliability"
              number={numberOf('reliability')}
              title={titleOf('reliability')}
            >
              <BulletList items={study.reliability} />
            </CaseSection>
          ) : null}

          {study.security ? (
            <CaseSection
              id="security"
              number={numberOf('security')}
              title={titleOf('security')}
            >
              <BulletList items={study.security} />
            </CaseSection>
          ) : null}

          {study.delivery ? (
            <CaseSection
              id="delivery"
              number={numberOf('delivery')}
              title={titleOf('delivery')}
            >
              <BulletList items={study.delivery} />
            </CaseSection>
          ) : null}

          <CaseSection
            id="outcomes"
            number={numberOf('outcomes')}
            title={titleOf('outcomes')}
          >
            <BulletList items={study.outcomes} marker="accent" />
          </CaseSection>

          <CaseSection
            id="tradeoffs"
            number={numberOf('tradeoffs')}
            title={titleOf('tradeoffs')}
          >
            <BulletList items={study.tradeoffs} />
          </CaseSection>
        </div>
      </div>

      <footer className="border-t border-line">
        <div className="container-page">
          <div className="grid gap-px bg-line md:grid-cols-2">
            <Link
              href="/#work"
              className="group flex flex-col justify-between gap-6 bg-bg py-10 md:pr-8"
            >
              <span className="label inline-flex items-center gap-2 text-subtle">
                <ArrowLeft className="arrow" /> All work
              </span>
              <span className="font-display text-xl font-semibold">
                Back to selected work
              </span>
            </Link>
            {next && next.slug !== project.slug ? (
              <Link
                href={`/work/${next.slug}`}
                className="group flex flex-col justify-between gap-6 bg-bg py-10 md:pl-8 md:text-right"
              >
                <span className="label inline-flex items-center gap-2 text-subtle md:justify-end">
                  Next case study <ArrowRight className="arrow" />
                </span>
                <span className="font-display text-xl font-semibold group-hover:text-accent-ink">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="border-t border-line">
          <div className="container-page flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-display text-h3 font-semibold">
              Working on something with similar constraints?
            </p>
            <Link href="/#contact" className="btn-primary shrink-0">
              Let&apos;s talk <ArrowRight className="arrow" />
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
