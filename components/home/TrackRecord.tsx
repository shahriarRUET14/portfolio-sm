import { profile } from '@/content/profile';
import { formatMonth, yearsSince } from '@/lib/dates';

export default function TrackRecord() {
  const items = [
    {
      value: `${yearsSince(profile.careerStart)}+ yrs`,
      label: `building production software, since ${formatMonth(
        profile.careerStart
      )}`,
    },
    {
      value: '27',
      label: 'microservices in the MFS platform I architected',
    },
    {
      value: '~20M BDT',
      label: 'in daily transactions on it, with zero settlement mismatch',
    },
    {
      value: '200+',
      label: 'enterprise workflows delivered for Robi Axiata',
    },
  ];

  return (
    <section aria-label="Track record" className="border-b border-line">
      <div className="container-page">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.value}
              className={`flex flex-col-reverse justify-end gap-3 py-8 lg:py-10 ${
                i % 2 === 1 ? 'border-l border-line pl-4 sm:pl-6' : 'pr-4'
              } ${i > 1 ? 'border-t border-line lg:border-t-0' : ''} ${
                i === 2 ? 'lg:border-l lg:pl-6' : ''
              }`}
            >
              <dt className="max-w-[24ch] text-sm leading-snug text-muted">
                {item.label}
              </dt>
              <dd className="font-display text-figure font-semibold">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
