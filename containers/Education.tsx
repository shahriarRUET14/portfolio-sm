import { educationInfo } from '../portfolio';
import SectionHeading from '../components/ui/SectionHeading';

export default function Education() {
  if (!educationInfo?.length) return null;

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="section-container">
        <SectionHeading title="Education" />
        <div className="space-y-4">
          {educationInfo.map((info) => (
            <article
              key={info.schoolName}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  {info.subHeader}
                </h3>
                <p className="shrink-0 text-sm text-slate-500">{info.duration}</p>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {info.schoolName}
                {info.location ? ` · ${info.location}` : ''}
              </p>
              {info.desc ? (
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {info.desc}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
