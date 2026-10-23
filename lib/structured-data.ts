import { profile } from '@/content/profile';
import type { Project } from '@/content/types';
import { absoluteUrl, siteUrl } from './site';

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    givenName: profile.givenName,
    familyName: profile.familyName,
    url: absoluteUrl('/'),
    ...(profile.portrait ? { image: absoluteUrl(profile.portrait.src) } : {}),
    jobTitle: profile.role,
    description: profile.positioning,
    email: `mailto:${profile.email}`,
    worksFor: { '@type': 'Organization', name: profile.current.company },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: profile.education.school,
      alternateName: profile.education.schoolShort,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location.city,
      addressCountry: profile.location.countryCode,
    },
    knowsAbout: [
      'Software architecture',
      'Microservices',
      'Distributed systems',
      'Event-driven architecture',
      'Java',
      'Spring Boot',
      'Node.js',
      'Ruby on Rails',
      'Apache Kafka',
      'Redis',
      'PostgreSQL',
      'LLM integration',
      'Multi-tenant SaaS',
      'Mobile financial services',
    ],
    sameAs: [profile.links.linkedin, profile.links.github],
  };
}

export function homeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: absoluteUrl('/'),
        name: profile.name,
        description: profile.positioning,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profilepage`,
        url: absoluteUrl('/'),
        name: `${profile.name} — ${profile.role}`,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        dateModified: profile.updated,
        inLanguage: 'en',
      },
    ],
  };
}

export function caseStudySchema(project: Project) {
  const url = absoluteUrl(`/work/${project.slug}`);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: project.caseStudy?.seoTitle ?? project.title,
        description: project.caseStudy?.seoDescription ?? project.summary,
        url,
        mainEntityOfPage: url,
        image: `${url}/opengraph-image`,
        author: {
          '@type': 'Person',
          '@id': personId,
          name: profile.name,
          url: absoluteUrl('/'),
        },
        publisher: { '@id': personId },
        isPartOf: { '@id': websiteId },
        dateModified: profile.updated,
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: profile.name,
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Selected work',
            item: absoluteUrl('/#work'),
          },
          { '@type': 'ListItem', position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}
