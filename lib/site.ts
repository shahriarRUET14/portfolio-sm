const fallbackUrl = 'https://portfolio-sm-ten.vercel.app';

/** Canonical origin without a trailing slash. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl
).replace(/\/+$/, '');

export const absoluteUrl = (path = '/') =>
  `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

export const navItems = [
  { href: '/#work', label: 'Work' },
  { href: '/#approach', label: 'Approach' },
  { href: '/#about', label: 'About' },
];
