import Head from 'next/head';
import { seoData, experience, skillsSection, educationInfo } from '../portfolio';

type SEOProps = {
  imageUrl?: string;
};

function buildPersonJsonLd(imageUrl: string) {
  const skillNames = skillsSection.groups.flatMap((group) => group.skills);
  const currentRole = experience.find((role) => role.highlight);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${seoData.url}#person`,
    name: seoData.author,
    alternateName: [
      'Shahriar Mahmud RUET',
      'shahriar.ruet14',
      'shahriarRuet14',
    ],
    url: seoData.url,
    image: imageUrl,
    email: seoData.email ? `mailto:${seoData.email}` : undefined,
    telephone: seoData.phone,
    jobTitle: seoData.jobTitle,
    description: seoData.description,
    nationality: 'Bangladeshi',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    worksFor: currentRole
      ? {
          '@type': 'Organization',
          name: currentRole.company,
        }
      : undefined,
    alumniOf: educationInfo.map((edu) => ({
      '@type': 'CollegeOrUniversity',
      name: edu.schoolName,
    })),
    knowsAbout: [
      ...skillNames,
      'FinTech',
      'Mobile Financial Services',
      'Enterprise Platforms',
      'Technical Leadership',
    ],
    sameAs: seoData.sameAs,
  };
}

function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoData.url}#website`,
    name: seoData.siteName ?? seoData.title,
    url: seoData.url,
    description: seoData.description,
    author: {
      '@id': `${seoData.url}#person`,
    },
    inLanguage: 'en',
  };
}

function buildProfilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${seoData.url}#profilepage`,
    url: seoData.url,
    name: seoData.title,
    description: seoData.description,
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntity: {
      '@id': `${seoData.url}#person`,
    },
    about: {
      '@id': `${seoData.url}#person`,
    },
  };
}

export default function SEO({ imageUrl }: SEOProps) {
  const title = seoData.title;
  const description = seoData.description ?? '';
  const url = seoData.url ?? '';
  const image = imageUrl || seoData.image || '';
  const siteName = seoData.siteName ?? 'Shahriar Mahmud Portfolio';
  const jsonLd = [
    buildPersonJsonLd(image),
    buildWebSiteJsonLd(),
    buildProfilePageJsonLd(),
  ];

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content={seoData.author} />
      <meta name="keywords" content={seoData.keywords.join(', ')} />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#1d4ed8" />
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-title" content="Shahriar Mahmud" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta
        property="og:image:alt"
        content={`${seoData.author} — ${seoData.jobTitle}`}
      />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={seoData.locale ?? 'en_US'} />
      <meta property="profile:first_name" content="Shahriar" />
      <meta property="profile:last_name" content="Mahmud" />
      <meta property="profile:username" content="shahriar-ruet14" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content={`${seoData.author} — ${seoData.jobTitle}`}
      />

      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />

      <script
        type="application/ld+json"
        // Person + WebSite + ProfilePage for Google rich results / Knowledge Panel signals
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
