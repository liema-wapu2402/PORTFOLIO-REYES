import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Award } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout";
import TimelineItem from "./TimelineItem";
import { EDUCATION, CERTIFICATIONS } from "./education.data";

/**
 * Education: an animated, responsive timeline.
 *
 * BACKGROUND (behind the content, `-z-10`; `isolate` on the section keeps it
 * from slipping behind the page):
 *   - the faint .bg-grid pattern from index.css, re-masked so it fades out
 *     from the centre (the default mask is anchored to the top-left)
 *   - a soft arctic glow in the middle (`--glow` is theme-aware)
 *
 * SCROLL-DRAWN LINE:
 *   `useScroll` reports how far the list has been scrolled through (0 -> 1).
 *   `useSpring` smooths that number, and it drives `scaleY` of the bright line,
 *   so the line "draws" downward as you scroll. The grey line underneath is the
 *   static track. `origin-top` makes the scale grow from the top edge.
 *
 * RESPONSIVE: see TimelineItem.jsx (single column on phones, alternating
 * left/right from `md` up).
 */
const GRID_MASK =
  "radial-gradient(ellipse 70% 60% at 50% 45%, #000 25%, transparent 100%)";

// Order comes from each entry's `id`: the HIGHEST id is shown at the top and
// id 1 at the bottom. (Entries without an id are treated as 0, so they sink to the bottom.)
const SORTED_EDUCATION = [...EDUCATION].sort(
  (a, b) => (b.id ?? 0) - (a.id ?? 0)
);

export default function Education() {
  const listRef = useRef(null);
  const reduce = useReducedMotion();

  // 0 when the top of the list reaches 75% down the screen,
  // 1 when its bottom reaches 55% down the screen.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  return (
    <Section id="education" className="isolate overflow-hidden">
      {/* ---------- Background ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="bg-grid absolute inset-0"
          style={{ WebkitMaskImage: GRID_MASK, maskImage: GRID_MASK }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_50%_40%,var(--glow),transparent)] opacity-60" />
      </div>

      <SectionHeading
        title="Education"
        description="Where I study and what I have completed."
      />

      {/* ---------- Timeline ---------- */}
      <ol ref={listRef} className="relative space-y-8 md:space-y-12">
        {/* Static track */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-4 top-6 w-px -translate-x-1/2 bg-linear-to-b from-border via-border to-transparent md:left-1/2"
        />
        {/* Line that draws itself while you scroll */}
        <motion.span
          aria-hidden="true"
          style={{ scaleY: reduce ? 1 : scaleY }}
          className="absolute bottom-0 left-4 top-6 w-px origin-top -translate-x-1/2 bg-linear-to-b from-foreground via-foreground/60 to-transparent md:left-1/2"
        />

        {SORTED_EDUCATION.map((item, index) => (
          <TimelineItem
            key={item.id ?? item.school + item.period}
            item={item}
            index={index}
          />
        ))}
      </ol>

      {/* ---------- Certifications (hidden while CERTIFICATIONS is empty) ---------- */}
      {CERTIFICATIONS.length > 0 && (
        <div className="mt-16">
          <h3 className="mb-5 text-xl font-semibold">Certifications</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.li
                key={cert.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="surface surface-hover flex items-start gap-3 p-5"
              >
                <Award className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">{cert.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer}
                    {cert.year ? ` · ${cert.year}` : ""}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
