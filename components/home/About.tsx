import Image from 'next/image';
import { about, leadership, roles } from '@/content/about';
import { profile } from '@/content/profile';
import { formatRange } from '@/lib/dates';
import { FileText } from '../icons';
import SectionHeader from '../ui/SectionHeader';

export default function About() {
  const { education } = profile;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-b border-line py-20 lg:py-32"
    >
      <div className="container-page">
        <SectionHeader
          id="about"
          index="04"
          label={`About ${profile.name}`}
          title={about.heading}
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          <aside className="lg:col-span-4" aria-label="At a glance">
            {profile.portrait ? (
              <figure className="flex items-end gap-4">
                <Image
                  src={profile.portrait.src}
                  width={profile.portrait.width}
                  height={profile.portrait.height}
                  alt={profile.portrait.alt}
                  sizes="144px"
                  className="h-36 w-36 border border-line object-cover grayscale-[0.85] contrast-[1.05]"
                />
                <figcaption className="pb-1 text-sm">
                  <span className="block font-medium">{profile.name}</span>
                  <span className="text-muted">{profile.role}</span>
                </figcaption>
              </figure>
            ) : null}

            <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                <dt className="label pt-0.5 text-subtle">Currently</dt>
                <dd>
                  {profile.current.role}, {profile.current.company}
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                <dt className="label pt-0.5 text-subtle">Education</dt>
                <dd>
                  {education.degree}, {education.school} (
                  {education.schoolShort}
                  ), {education.period}
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                <dt className="label pt-0.5 text-subtle">Location</dt>
                <dd>
                  {profile.location.city}, {profile.location.country} (
                  {profile.location.utcOffset})
                </dd>
              </div>
            </dl>

            {profile.resume ? (
              <a
                href={profile.resume.href}
                download={profile.resume.fileName}
                className="btn-secondary mt-6"
              >
                <FileText /> Download résumé (PDF)
              </a>
            ) : null}
          </aside>

          <div className="prose-body max-w-[38rem] text-[1.0625rem] leading-[1.75] lg:col-span-7 lg:col-start-6">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-12 lg:gap-6">
          <h3 className="font-display text-h3 font-semibold lg:col-span-4">
            Experience
          </h3>
          <ol className="border-t border-line-strong lg:col-span-8">
            {roles.map((role) => (
              <li
                key={`${role.company}-${role.start}`}
                data-reveal
                className="grid gap-2 border-b border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <p className="font-mono text-[12px] text-subtle sm:pt-1">
                  {formatRange(role.start, role.end)}
                </p>
                <div>
                  <p className="font-medium">
                    {role.title}{' '}
                    <span className="text-muted">· {role.company}</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {role.summary}
                  </p>
                </div>
              </li>
            ))}
            <li className="grid gap-2 border-b border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <p className="font-mono text-[12px] text-subtle sm:pt-1">
                {education.period}
              </p>
              <div>
                <p className="font-medium">
                  {education.degree}{' '}
                  <span className="text-muted">· {education.schoolShort}</span>
                </p>
                {education.note ? (
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {education.note}
                  </p>
                ) : null}
              </div>
            </li>
          </ol>
        </div>

        <div className="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <h3 className="font-display text-h3 font-semibold">
              Collaboration &amp; leadership
            </h3>
            <p className="mt-3 max-w-sm text-muted">
              Seniority shows in how someone works with a team, more than in a
              title.
            </p>
          </div>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {leadership.map((theme) => (
              <li key={theme.title} data-reveal className="bg-bg p-5 lg:p-6">
                <h4 className="font-medium">{theme.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {theme.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
