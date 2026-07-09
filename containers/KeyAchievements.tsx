import { achievements } from '../portfolio';
import SectionHeading from '../components/ui/SectionHeading';

export default function KeyAchievements() {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="section-container">
        <SectionHeading
          title="Key Achievements"
          subtitle="High-impact outcomes from FinTech and enterprise platform delivery."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {achievements.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
