import type { ExperienceType } from '../types/sections';
import Chip from './ui/Chip';

function CompanyLogo({ company }: { company: string }) {
  const initials = company
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <div
      aria-hidden
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-600"
    >
      {initials}
    </div>
  );
}

export default function ExperienceCard({
  company,
  role,
  date,
  location,
  descBullets,
  techStack,
  highlight,
}: ExperienceType) {
  return (
    <article
      className={`relative border-l-2 border-slate-200 pb-10 pl-8 last:pb-0 ${
        highlight ? 'border-l-blue-700' : ''
      }`}
    >
      <div
        className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ${
          highlight ? 'bg-blue-700' : 'bg-slate-300'
        }`}
        aria-hidden
      />
      <div className="flex flex-wrap items-start gap-3">
        <CompanyLogo company={company} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{role}</h3>
            {highlight ? (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                Current
              </span>
            ) : null}
          </div>
          <p className="text-sm font-medium text-slate-700">{company}</p>
          <p className="text-sm text-slate-500">
            {date}
            {location ? ` · ${location}` : ''}
          </p>
        </div>
      </div>

      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
        {descBullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      {techStack.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      ) : null}
    </article>
  );
}
