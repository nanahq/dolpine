'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Reveals elements marked with `.n-reveal` as they scroll into view,
 * mirroring the design's nana-rise effect. Re-scans on route change.
 * Mounted once in the root layout.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.n-reveal:not(.is-visible)'),
    );

    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    els.forEach((el) => {
      // Anything already in view on load reveals immediately.
      if (el.getBoundingClientRect().top < window.innerHeight * 1.05) {
        el.classList.add('is-visible');
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
