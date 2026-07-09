import type { ProjectType } from '../types/sections';
import Chip from './ui/Chip';
import Button from './ui/Button';

export default function ProjectsCard({
  name,
  problem,
  role,
  stack,
  impact,
  link,
  github,
}: ProjectType) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      <p className="mt-2 text-sm text-slate-600">{problem}</p>
      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500">
        Role
      </p>
      <p className="mt-1 text-sm text-slate-700">{role}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        <span className="font-medium text-slate-800">Impact: </span>
        {impact}
      </p>
      {link || github ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {link ? (
            <Button href={link} variant="secondary" target="_blank" rel="noopener noreferrer">
              View Project
            </Button>
          ) : null}
          {github ? (
            <Button href={github} variant="ghost" target="_blank" rel="noopener noreferrer">
              GitHub
            </Button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
