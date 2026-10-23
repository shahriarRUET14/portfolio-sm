import { profile } from '@/content/profile';
import { ArrowUp } from '../icons';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const links = [
    { href: `mailto:${profile.email}`, label: 'Email', external: false },
    { href: profile.links.linkedin, label: 'LinkedIn', external: true },
    { href: profile.links.github, label: 'GitHub', external: true },
    ...(profile.resume
      ? [{ href: profile.resume.href, label: 'Résumé', external: true }]
      : []),
  ];

  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-6">
          <p className="font-display text-xl font-semibold tracking-[-0.02em]">
            {profile.name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            {profile.positioning}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm md:col-span-4">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="link text-muted"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-start md:col-span-2 md:justify-end">
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-sm text-muted hover:text-fg"
          >
            Back to top <ArrowUp className="arrow arrow-up" />
          </a>
        </div>

        <p className="label text-subtle md:col-span-12">
          © {year} {profile.name} · {profile.location.city},{' '}
          {profile.location.country}
        </p>
      </div>
    </footer>
  );
}
