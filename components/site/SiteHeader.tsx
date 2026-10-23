import Link from 'next/link';
import { navItems } from '@/lib/site';
import { profile } from '@/content/profile';
import { ArrowRight } from '../icons';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95">
      <div className="container-page relative flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${profile.name} — home`}
        >
          <span
            aria-hidden="true"
            className="h-3 w-3 bg-accent transition-transform duration-300 ease-out-quart group-hover:rotate-45"
          />
          <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em]">
            {profile.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {profile.resume ? (
              <li>
                <a
                  href={profile.resume.href}
                  target="_blank"
                  rel="noopener"
                  className="text-muted transition-colors hover:text-fg"
                >
                  Résumé
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </li>
            ) : null}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/#contact"
            className="btn-primary hidden min-h-[40px] px-4 sm:inline-flex"
          >
            Let&apos;s talk <ArrowRight className="arrow" />
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
