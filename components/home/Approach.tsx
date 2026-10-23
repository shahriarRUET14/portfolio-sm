import type { CSSProperties } from 'react';
import { principles } from '@/content/approach';
import SectionHeader from '../ui/SectionHeader';

export default function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="border-b border-line py-20 lg:py-32"
    >
      <div className="container-page">
        <SectionHeader
          id="approach"
          index="02"
          label="Engineering approach"
          title="How I make technical decisions."
          intro={
            <p>
              Principles only matter if they show up in the work, so each one is
              tied to a system I have built.
            </p>
          }
        />

        <ol className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {principles.map((principle, i) => (
            <li
              key={principle.title}
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as CSSProperties}
              className="flex flex-col bg-bg p-6 lg:p-8"
            >
              <span className="font-mono text-label text-accent-ink">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-[1.375rem] font-semibold leading-tight tracking-[-0.02em]">
                {principle.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {principle.body}
              </p>
              <div className="mt-auto pt-6">
                <p className="border-l-2 border-accent-ink/60 pl-3 text-sm leading-relaxed">
                  <span className="label mb-1 block text-subtle">
                    In practice
                  </span>
                  {principle.inPractice}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
