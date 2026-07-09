import Image from 'next/image';
import { greetings, socialLinks } from '../portfolio';
import type { GithubUserType } from '../types';
import Button from '../components/ui/Button';

export default function Greetings({ avatar_url }: GithubUserType) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="section-container">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
              {greetings.headline}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {greetings.title}
            </h1>
            <p className="mt-3 text-lg font-medium text-slate-700">
              {greetings.headline} · {greetings.subheadline}
            </p>
            <div className="mt-5 space-y-2">
              {greetings.pitch.map((line) => (
                <p key={line} className="text-base leading-relaxed text-slate-700">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {greetings.resumeLink ? (
                <Button
                  href={greetings.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download Resume
                </Button>
              ) : null}
              {socialLinks.linkedin ? (
                <Button href={socialLinks.linkedin} variant="secondary" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </Button>
              ) : null}
            </div>
          </div>

          {avatar_url ? (
            <div className="flex justify-center lg:justify-end">
              <Image
                src={avatar_url}
                alt={`${greetings.title} profile photo`}
                width={200}
                height={200}
                className="rounded-full border-4 border-slate-100 shadow-md"
                priority
              />
            </div>
          ) : null}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {greetings.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-center"
            >
              <p className="text-2xl font-bold text-blue-700">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
