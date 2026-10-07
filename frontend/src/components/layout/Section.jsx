import { cn } from '@/lib/utils';

/**
 * Section: the shared wrapper for every part of the page.
 *
 *  - `scroll-mt-20`   -> scroll-margin-top: 5rem. When the navbar links jump to
 *                        this section, the browser stops 5rem early so the fixed
 *                        navbar does not cover the heading.
 *  - `py-16 sm:py-24` -> vertical rhythm: 4rem on phones, 6rem from 640px up.
 *  - inner container  -> `mx-auto max-w-6xl` centres the content and caps its
 *                        width at 72rem; `px-5 sm:px-8` keeps side padding.
 *
 * Responsive prefixes (sm:, md:, lg:) are "mobile first": the plain class is the
 * phone layout, and the prefixed class takes over at that screen width and up.
 */
export default function Section({ id, className, containerClassName, children }) {
  return (
    <section id={id} className={cn('relative scroll-mt-20 py-16 sm:py-24', className)}>
      <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
