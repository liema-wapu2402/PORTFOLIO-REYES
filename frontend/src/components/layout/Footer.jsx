import { SITE } from '@/data/site';

/**
 * Footer. `pb-28` leaves room at the bottom so the fixed social dock
 * never covers the last line of text.
 */
export default function Footer() {
  return (
    <footer className="border-t border-border/70 px-5 pb-28 pt-8 text-sm text-muted-foreground sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
        </p>
        <p>Built with React, Tailwind CSS and Vite.</p>
      </div>
    </footer>
  );
}
