import { skillsSection } from '../portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import Chip from '../components/ui/Chip';

export default function Skills() {
  return (
    <section id="skills" className="section-anchor border-b border-slate-200 bg-white">
      <div className="section-container">
        <SectionHeading title={skillsSection.title} />
        <div className="space-y-8">
          {skillsSection.groups.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
