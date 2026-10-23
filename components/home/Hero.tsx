import type { CSSProperties } from 'react';
import { profile } from '@/content/profile';
import { formatMonth, yearsSince } from '@/lib/dates';
import { ArrowDown } from '../icons';

const delay = (ms: number) => ({ '--enter-delay': `${ms}ms` } as CSSProperties);

export default function Hero() {
  const years = yearsSince(profile.careerStart);
  const facts = [
    {
      term: 'Now',
      detail: `${profile.current.company} · since ${formatMonth(
        profile.current.since
      )}`,
    },
    { term: 'Focus', detail: profile.focus.join(' · ') },
    { term: 'Domains', detail: profile.domains.join(' · ') },
    {
      term: 'Experience',
      detail: `${years}+ years · since ${formatMonth(profile.careerStart)}`,
    },
    {
      term: 'Education',
      detail: `B.Sc. CSE · ${profile.education.schoolShort}`,
    },
    {
      term: 'Based in',
      detail: `${profile.location.city}, ${profile.location.country} · ${profile.location.utcOffset}`,
    },
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-line"
    >
      <div
        aria-hidden="true"
        className="container-page pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      >
        <div className="grid-guides h-full border-x border-line/40" />
      </div>

      <div className="container-page relative pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
        <h1 id="hero-title">
          <span className="label enter flex items-center gap-3">
            <span aria-hidden="true" className="h-2 w-2 bg-accent" />
            {profile.name} — {profile.role}
          </span>
          <span className="mt-6 block max-w-[19ch] font-display text-display font-semibold lg:mt-8">
            {profile.headline}
          </span>
        </h1>

        <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-6">
          <div className="enter lg:col-span-6" style={delay(120)}>
            <p className="max-w-prose text-lead text-muted">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="btn-primary">
                Explore selected work <ArrowDown className="arrow" />
              </a>
              <a href="#contact" className="btn-secondary">
                Get in touch
              </a>
            </div>
          </div>

          <aside
            aria-label="Profile summary"
            className="enter border border-line bg-surface lg:col-span-5 lg:col-start-8"
            style={delay(240)}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
              <span className="label">Profile</span>
              <span className="label text-subtle">
                Updated {formatMonth(profile.updated.slice(0, 7))}
              </span>
            </div>
            <dl className="divide-y divide-line">
              {facts.map((fact) => (
                <div
                  key={fact.term}
                  className="grid grid-cols-[6.5rem_1fr] gap-4 px-4 py-3 sm:px-5"
                >
                  <dt className="label pt-0.5 text-subtle">{fact.term}</dt>
                  <dd className="text-sm">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div
          className="enter mt-12 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-baseline sm:gap-6 lg:mt-16"
          style={delay(360)}
        >
          <p className="label shrink-0 text-subtle">Works with</p>
          <p className="font-mono text-[13px] leading-relaxed text-muted">
            {profile.capabilities.join(' / ')}
          </p>
        </div>
      </div>
    </section>
  );
}
