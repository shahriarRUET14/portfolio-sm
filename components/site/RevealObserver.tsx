'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

const SELECTOR =
  '[data-reveal]:not(.is-revealed), [data-reveal-cells]:not(.is-revealed)';

/**
 * Progressive scroll reveals. Content is visible by default; elements are only
 * hidden (via the `reveal-ready` class) once this observer is running, and
 * anything already on screen is revealed before the first paint.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const viewportBottom = window.innerHeight * 0.92;
    const pending: Element[] = [];
    document.querySelectorAll(SELECTOR).forEach((element) => {
      if (element.getBoundingClientRect().top < viewportBottom) {
        element.classList.add('is-revealed');
      } else {
        pending.push(element);
      }
    });

    document.documentElement.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    pending.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
