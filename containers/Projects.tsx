import { projects } from '../portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectsCard from '../components/ProjectsCard';

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-anchor border-b border-slate-200 bg-slate-50"
    >
      <div className="section-container">
        <SectionHeading title="Projects" subtitle="Enterprise case studies and platform delivery." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((data) => (
            <ProjectsCard key={data.name} {...data} />
          ))}
        </div>
      </div>
    </section>
  );
}
