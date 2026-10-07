import { Section, SectionHeading } from '@/components/layout';
import { VelocityText } from '@/components/effects/ScrollVelocity';
import { LOGOS } from './logoMap';
import { SKILL_ROWS, EXTRA_SKILLS } from './skills.data';

/**
 * LogoTile: one rounded tile per logo.
 *
 * The PNG logos have transparent backgrounds and some are dark (Next.js, Git...),
 * so they would disappear on a dark page. Every logo therefore sits on a light
 * tile in BOTH themes:
 *   light: white -> arctic gray gradient
 *   dark : slightly dimmed (`dark:opacity-90`) so tiles do not glare against graphite
 * `p-4` keeps breathing room, `object-contain` (in SkillLogos) keeps proportions.
 */
function LogoTile({ name, Logo }) {
  return (
    <div
      title={name}
      className="mx-2 size-20 shrink-0 rounded-2xl border border-border/70 bg-linear-to-br from-white to-arctic-200 p-4 shadow-sm dark:opacity-90 sm:mx-3 sm:size-24"
    >
      <Logo />
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        title="Tech stack"
        description="Languages, frameworks and tools I use to design, build and ship."
      />

      {/*
        MARQUEE
        Two rows scroll in opposite directions (positive vs negative baseVelocity)
        and speed up when the visitor scrolls (see effects/ScrollVelocity.jsx).
        `.fade-edges-x` (index.css) masks the left and right edges so tiles dissolve.
        `-mx-5 sm:-mx-8` cancels the Section's side padding so the marquee runs
        edge to edge on every screen size.
      */}
      <div className="fade-edges-x -mx-5 flex flex-col gap-4 sm:-mx-8">
        {SKILL_ROWS.map((row, rowIndex) => (
          <VelocityText key={rowIndex} baseVelocity={rowIndex % 2 === 0 ? -4 : 4} numCopies={4}>
            {row.map((key) => (
              <LogoTile key={key} name={key} Logo={LOGOS[key]} />
            ))}
          </VelocityText>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-2.5">
        <span className="mr-1 text-sm text-muted-foreground">Also working with</span>
        {EXTRA_SKILLS.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border bg-linear-to-br from-surface-from to-surface-to px-3.5 py-1.5 text-sm text-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </Section>
  );
}
