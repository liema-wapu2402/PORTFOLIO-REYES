import { useRef } from 'react';
import { ArrowUpRight, Code2 } from 'lucide-react';

/** A link only counts if it is a real URL (not '' and not the old '#' placeholder). */
const isLink = (url) => Boolean(url) && url !== '#';

/**
 * ProjectCard
 * -----------
 * Layout (top to bottom): media -> title -> description -> tags -> links.
 *
 * - `.surface` + `.surface-hover` (index.css) give the gradient, faded container
 *   and the small lift on hover.
 * - `group` on the <article> lets child elements react to hovering the WHOLE card
 *   with `group-hover:` (used for the image zoom and the sheen below).
 * - `flex h-full flex-col` + `mt-auto` on the links pushes them to the bottom, so
 *   every card in a row lines up even when descriptions have different lengths.
 * - Preview videos start on hover or keyboard focus and pause when you leave,
 *   which keeps the page light (no 9 videos autoplaying at once).
 */
export default function ProjectCard({ project }) {
  const videoRef = useRef(null);

  const play = () => videoRef.current?.play().catch(() => {});
  const stop = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <article
      className="surface surface-hover group flex h-full flex-col"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      {/* ---------- Media ---------- */}
      {/* aspect-[16/10] reserves the space before the image loads (no layout jump). */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            // group-hover:scale-105 zooms the image 5% when the card is hovered.
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
          />
        ) : (
          // No screenshot: a gradient tile with the first letter keeps the grid even.
          <div className="flex size-full items-center justify-center bg-linear-to-br from-arctic-200 to-arctic-400 font-display text-5xl font-semibold text-arctic-700 dark:from-arctic-800 dark:to-arctic-900 dark:text-arctic-300">
            {project.title.charAt(0)}
          </div>
        )}

        {project.videoUrl && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            // Invisible until hover: opacity-0 -> group-hover:opacity-100 (cross-fade over the image).
            className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Faded bottom edge: transparent at the top, card colour at the bottom,
            so the image melts into the card body instead of ending in a hard line. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-surface-from/90 to-transparent"
        />
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border/80 bg-background/50 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm font-medium">
          {isLink(project.liveUrl) && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline"
            >
              Live site
              <ArrowUpRight className="size-4" />
            </a>
          )}
          {isLink(project.repoUrl) && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              <Code2 className="size-4" />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
