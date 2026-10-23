'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { navItems } from '@/lib/site';
import { profile } from '@/content/profile';
import { ArrowRight, ArrowUpRight, Close, Menu } from '../icons';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector('a')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center text-fg"
      >
        {open ? <Close size={20} /> : <Menu size={20} />}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-bg"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="divide-y divide-line border-y border-line">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-[52px] items-center justify-between font-display text-xl font-semibold"
                >
                  {item.label}
                  <ArrowRight className="text-subtle" />
                </Link>
              </li>
            ))}
            {profile.resume ? (
              <li>
                <a
                  href={profile.resume.href}
                  target="_blank"
                  rel="noopener"
                  onClick={close}
                  className="flex min-h-[52px] items-center justify-between font-display text-xl font-semibold"
                >
                  Résumé
                  <ArrowUpRight className="text-subtle" />
                </a>
              </li>
            ) : null}
          </ul>
          <Link
            href="/#contact"
            onClick={close}
            className="btn-primary mt-4 w-full"
          >
            Let&apos;s talk <ArrowRight className="arrow" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
