import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  motionValue,
  useAnimationFrame,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout";
import { LOGOS } from "./logoMap";
import {
  SKILL_ROWS,
  SKILL_NAMES,
  ROW_DIRECTIONS,
  EXTRA_SKILLS,
} from "./skills.data";

/* ---------------------------------------------------------------------
   SETTINGS: change these numbers to tune the behaviour.
   --------------------------------------------------------------------- */
const IDLE_SPEED = 10; // px per second while nobody clicks (the drifting effect)
const SLIDE_SECONDS = 0.9; // how long one button click takes to slide to the next set
const HOLD_MS = 3500; // how long the new set stays still before the drifting resumes
const COPIES = 3; // each row is repeated this many times so the loop never shows a gap

// How many cards make up one "set", based on the width available. Phones show 3,
// tablets 4 and desktops 6. One button click moves by exactly one set.
const visibleFor = (width) => (width >= 680 ? 6 : width >= 440 ? 4 : 3);
const gapFor = (visible) => (visible >= 4 ? 16 : 12);

// Fade the outer 1rem of the clip area so cards dissolve as they enter / leave.
const EDGE_MASK =
  "linear-gradient(to right, transparent, #000 1rem, #000 calc(100% - 1rem), transparent)";

/**
 * SkillCard: one logo + its name.
 * The PNG logos are transparent and some are dark (Next.js, Git...), so every logo sits
 * on a light plate in BOTH themes. The card around it is the shared `.surface` look.
 */
function SkillCard({ skillKey, width, hidden }) {
  const Logo = LOGOS[skillKey];
  return (
    <div
      aria-hidden={hidden || undefined}
      style={{ width }}
      className="surface surface-hover flex shrink-0 flex-col items-center gap-2 p-2.5 sm:gap-3 sm:p-3.5"
    >
      <div className="size-12 rounded-xl border border-border/70 bg-linear-to-br from-white to-arctic-200 p-2 shadow-sm sm:size-14 lg:size-[4.5rem] lg:p-2.5">
        <Logo />
      </div>
      <p className="text-center text-[11px] font-medium text-foreground/90 sm:text-sm">
        {SKILL_NAMES[skillKey]}
      </p>
    </div>
  );
}

/**
 * MarqueeRow: one row of cards that can be shifted left / right.
 *
 * `offset` is a motion value (a number that changes without re-rendering React).
 * The row is drawn at translateX = -(offset mod loopWidth) - loopWidth. Because the
 * row is repeated COPIES times, jumping from the end of one loop back to the start is
 * invisible, so it can drift forever in either direction. The extra `- loopWidth`
 * parks the middle copy in view, so there are cards on BOTH sides of the visible
 * area and the edge fade never shows an empty gap.
 */
function MarqueeRow({ keys, offset, loopWidthRef, loopIndex, layout }) {
  const x = useTransform(offset, (o) => {
    const w = loopWidthRef.current[loopIndex];
    if (!w) return 0;
    return -(((o % w) + w) % w) - w;
  });

  return (
    <motion.div style={{ x, gap: layout.gap }} className="flex w-max">
      {Array.from({ length: COPIES }).flatMap((_, copy) =>
        keys.map((key) => (
          <SkillCard
            key={`${copy}-${key}`}
            skillKey={key}
            width={layout.cardW}
            hidden={copy > 0}
          />
        ))
      )}
    </motion.div>
  );
}

/**
 * Skills: the tech-stack marquee with left / right buttons.
 *
 * IDLE (nobody clicking)
 *   Both rows drift forever: the first row to the right and the second to the left
 *   (see ROW_DIRECTIONS in skills.data.js). Scrolling the page speeds them up a little,
 *   like the original marquee.
 *
 * BUTTON CLICK
 *   The drifting pauses, both rows slide together by one full set (6 cards on desktop)
 *   and stop exactly on a card edge, so a clean set is on show. The set stays still
 *   for HOLD_MS, then the drifting resumes from there.
 *   Clicks are ignored while a slide is running, so it works one set at a time.
 *
 * There is no scrollbar and no drag / swipe: the only manual control is the buttons.
 */
export default function Skills() {
  const reduce = useReducedMotion();
  const measureRef = useRef(null);
  const [layout, setLayout] = useState({
    width: 0,
    visible: 6,
    gap: 16,
    cardW: 120,
    unit: 136,
  });
  const layoutRef = useRef(layout);
  const loopWidthRef = useRef([]); // px width of one full loop, per row

  // One motion value per row, created once.
  const [offsets] = useState(() => SKILL_ROWS.map(() => motionValue(0)));

  const pausedRef = useRef(false);
  const busyRef = useRef(false);
  const holdTimer = useRef(null);

  // ----- measure the available width and derive card sizes -----
  const measure = useCallback(() => {
    const el = measureRef.current;
    if (!el) return;
    const width = el.clientWidth;
    const visible = visibleFor(width);
    const gap = gapFor(visible);
    const cardW = (width - (visible - 1) * gap) / visible;
    const next = { width, visible, gap, cardW, unit: cardW + gap };
    layoutRef.current = next;
    loopWidthRef.current = SKILL_ROWS.map((row) => row.length * next.unit);
    setLayout(next);
    // Nudge the rows so they redraw with the new sizes (matters when motion is reduced).
    offsets.forEach((mv) => mv.set(mv.get() + 0.0001));
  }, [offsets]);

  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(measureRef.current);
    return () => {
      observer.disconnect();
      clearTimeout(holdTimer.current);
    };
  }, [measure]);

  // ----- idle drifting (runs every frame, never re-renders React) -----
  const { scrollY } = useScroll();
  const scrollSpeed = useSpring(useVelocity(scrollY), {
    damping: 50,
    stiffness: 400,
  });

  useAnimationFrame((_, delta) => {
    if (reduce || pausedRef.current || !layoutRef.current.width) return;
    const boost = 1 + Math.min(Math.abs(scrollSpeed.get()) / 200, 6); // faster while scrolling
    const seconds = Math.min(delta, 100) / 1000; // cap so a background tab does not jump
    offsets.forEach((mv, i) => {
      // offset DOWN = the row moves right, offset UP = the row moves left
      const dir =
        ROW_DIRECTIONS[i % ROW_DIRECTIONS.length] === "right" ? -1 : 1;
      const w = loopWidthRef.current[i];
      const next = mv.get() + dir * IDLE_SPEED * boost * seconds;
      mv.set(w ? ((next % w) + w) % w : next); // keep the number small
    });
  });

  // ----- button click: slide one set, hold, then resume drifting -----
  const go = (direction) => {
    // direction: +1 = show the next set (right button), -1 = previous set (left button)
    const { unit, visible, width } = layoutRef.current;
    if (busyRef.current || !width) return;

    busyRef.current = true;
    pausedRef.current = true;
    clearTimeout(holdTimer.current);

    const slides = offsets.map((mv) => {
      // land exactly on a card edge so a full, tidy set is displayed
      const target = (Math.round(mv.get() / unit) + direction * visible) * unit;
      if (reduce) {
        mv.set(target);
        return Promise.resolve();
      }
      return animate(mv, target, {
        duration: SLIDE_SECONDS,
        ease: [0.22, 1, 0.36, 1],
      });
    });

    Promise.all(slides).then(() => {
      busyRef.current = false;
      holdTimer.current = setTimeout(() => {
        pausedRef.current = false;
      }, HOLD_MS);
    });
  };

  const arrowClass =
    "absolute top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border " +
    "bg-linear-to-br from-surface-from to-surface-to text-foreground shadow-[0_10px_25px_-12px_var(--surface-shadow)] " +
    "transition duration-300 hover:scale-105 hover:border-ring/60 active:scale-95 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:size-11";

  return (
    <Section id="skills" className="isolate overflow-hidden">
      {/* ---------- Background (same family as Education) ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_55%,var(--glow),transparent)] opacity-50" />
      </div>

      <SectionHeading
        title="Tech stack"
        description="Languages, frameworks and tools I use to design, build and ship."
      />

      <div className="relative">
        <button
          type="button"
          aria-label="Show previous skills"
          onClick={() => go(-1)}
          className={`${arrowClass} left-0`}
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* `measureRef` is the exact width one set of cards must fit into. The margins
            leave room for the two buttons. */}
        <div ref={measureRef} className="mx-12 sm:mx-14">
          {/* Clip area: 1rem wider than the set on each side, so cards fade in / out
              at the edges while a resting set sits fully visible. */}
          <div
            className="-mx-4 flex flex-col overflow-hidden px-4 py-2"
            style={{
              gap: layout.gap,
              WebkitMaskImage: EDGE_MASK,
              maskImage: EDGE_MASK,
            }}
          >
            {SKILL_ROWS.map((row, i) => (
              <MarqueeRow
                key={i}
                keys={row}
                offset={offsets[i]}
                loopWidthRef={loopWidthRef}
                loopIndex={i}
                layout={layout}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Show next skills"
          onClick={() => go(1)}
          className={`${arrowClass} right-0`}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* ---------- Tools without a logo file ---------- */}
      <div className="mt-10 flex flex-wrap items-center gap-2.5">
        <span className="mr-1 text-sm text-muted-foreground">
          Also working with
        </span>
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
