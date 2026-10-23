import { renderOgImage, ogSize } from '@/components/seo/og';
import { profile } from '@/content/profile';
import { caseStudies, getProject } from '@/content/projects';

export const alt = `Case study by ${profile.name}`;
export const size = ogSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return renderOgImage({
    eyebrow: `Case study · ${project?.domain ?? 'Selected work'}`,
    title: project?.title ?? profile.headline,
    footer: `${profile.name} — ${profile.role}`,
  });
}
