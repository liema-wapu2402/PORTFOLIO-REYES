import { useState } from 'react';
import { Section, SectionHeading } from '@/components/layout';
import ProjectCard from './ProjectCard';
import { PROJECTS } from './projects.data';

// How many cards are visible before "Show all projects" is pressed.
const INITIAL_COUNT = 6;

/**
 * Projects
 * --------
 * ONE responsive grid replaces the old Projects.jsx + ProjectsMobile.jsx pair.
 *
 *   grid                -> display: grid
 *   gap-5 / sm:gap-6    -> space between cards
 *   (default)           -> 1 column on phones
 *   sm:grid-cols-2      -> 2 columns from 640px
 *   lg:grid-cols-3      -> 3 columns from 1024px
 *
 * Because the layout is decided by CSS breakpoints, there is no need for the old
 * JavaScript `isMobile` check or for duplicate data.
 */
export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? PROJECTS : PROJECTS.slice(0, INITIAL_COUNT);

  return (
    <Section id="projects">
      <SectionHeading
        title="Selected projects"
        description="A look at things I have designed and built. Hover a card to preview it."
      />

      <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      {PROJECTS.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="btn-soft"
          >
            {showAll ? 'Show fewer projects' : `Show all projects (${PROJECTS.length})`}
          </button>
        </div>
      )}
    </Section>
  );
}
