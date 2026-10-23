import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';
import { caseStudies } from '@/content/projects';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(profile.updated);

  return [
    {
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      ...(profile.portrait
        ? { images: [absoluteUrl(profile.portrait.src)] }
        : {}),
    },
    ...caseStudies.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
