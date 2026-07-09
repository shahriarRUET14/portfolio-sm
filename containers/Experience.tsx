import { experience } from '../portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import ExperienceCard from '../components/ExperienceCard';

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-anchor border-b border-slate-200 bg-white"
    >
      <div className="section-container">
        <SectionHeading title="Experience" />
        <div className="space-y-0">
          {experience.map((data) => (
            <ExperienceCard key={`${data.company}-${data.role}-${data.date}`} {...data} />
          ))}
        </div>
      </div>
    </section>
  );
}
