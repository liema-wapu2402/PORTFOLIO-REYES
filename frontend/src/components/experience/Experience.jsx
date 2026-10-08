import { Section, SectionHeading } from "@/components/layout";
import WorkCard from "./WorkCard";
import Organizations from "./Organizations";
import { EXPERIENCE, ORGANIZATIONS } from "./experience.data";

/**
 * Experience: work history cards, followed by an organizations block.
 *
 * BACKGROUND (behind the content, `-z-10`; `isolate` keeps it from slipping
 * behind the page): the faint .bg-grid pattern, masked to fade out from the
 * centre, plus a soft theme-aware glow (`--glow`), same family as Education.
 *
 * RESPONSIVE: see WorkCard.jsx (header strip on phones, two-column card from
 * `md`, wider rail from `lg`) and Organizations.jsx (stacked until `lg`, then
 * a 7/5 split). The gap between work cards grows with the screen.
 *
 * DATA: everything comes from experience.data.js.
 */
const GRID_MASK =
  "radial-gradient(ellipse 70% 60% at 50% 40%, #000 25%, transparent 100%)";

export default function Experience() {
  return (
    <Section id="experience" className="isolate overflow-hidden">
      {/* ---------- Background ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="bg-grid absolute inset-0"
          style={{ WebkitMaskImage: GRID_MASK, maskImage: GRID_MASK }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_10%_30%,var(--glow),transparent)] opacity-60" />
      </div>

      <SectionHeading
        title="Experience"
        description="Where I have worked and the communities I am part of."
      />

      {/* ---------- Work ---------- */}
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {EXPERIENCE.map((item, i) => (
          <WorkCard
            key={item.id ?? item.role + item.period}
            item={item}
            index={i}
          />
        ))}
      </div>

      {/* ---------- Organizations (hidden while ORGANIZATIONS is empty) ---------- */}
      <Organizations items={ORGANIZATIONS} />
    </Section>
  );
}
