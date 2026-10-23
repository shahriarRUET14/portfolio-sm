import { capabilities } from '@/content/expertise';
import SectionHeader from '../ui/SectionHeader';

export default function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="border-b border-line py-20 lg:py-32"
    >
      <div className="container-page">
        <SectionHeader
          id="expertise"
          index="03"
          label="Expertise"
          title="Capabilities, with the evidence."
          intro={
            <p>
              Grouped by what the work requires and tied to where it has been
              used. No proficiency bars — the projects carry that.
            </p>
          }
        />

        <dl className="mt-14 border-t border-line-strong lg:mt-20">
          {capabilities.map((capability) => (
            <div
              key={capability.name}
              data-reveal
              className="grid gap-3 border-b border-line py-6 lg:grid-cols-12 lg:gap-6 lg:py-7"
            >
              <dt className="font-display text-lg font-semibold tracking-[-0.015em] lg:col-span-3">
                {capability.name}
              </dt>
              <dd className="font-mono text-[13px] leading-relaxed text-fg lg:col-span-5">
                {capability.tools.join(' · ')}
              </dd>
              {capability.evidence ? (
                <dd className="text-sm leading-relaxed text-muted lg:col-span-4">
                  <span className="sr-only">Applied in: </span>
                  {capability.evidence}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
