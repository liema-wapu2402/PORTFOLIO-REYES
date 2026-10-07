import { motion, useReducedMotion } from "motion/react";
import { BookOpen, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * TimelineItem: one entry on the education timeline.
 *
 * LAYOUT (mobile first)
 *   - Phone / tablet (< md): a single column. The timeline line runs down the
 *     left edge (left-4), the round node sits on it, and the card is pushed
 *     right with `pl-12`. The period is shown inside the card as a small badge.
 *   - Desktop (md and up): a two-column grid. The line moves to the exact
 *     centre (`md:left-1/2`), the card alternates left / right of it, and the
 *     period is shown in the opposite column, so each entry reads as
 *     "date <-> node <-> card".
 *
 * ANIMATION
 *   - The card fades and rises into place the first time it enters the screen
 *     (`whileInView` + `viewport.once`).
 *   - The node pops in with a small spring.
 *   - The newest entry (index 0) has a soft pulsing ring (`animate-ping`).
 *   - Visitors who prefer reduced motion get no animation at all: `initial` is
 *     set to `false`, which makes motion render the final state straight away.
 */
export default function TimelineItem({ item, index }) {
  const reduce = useReducedMotion();
  const onRight = index % 2 === 0; // card on the right of the line (desktop)

  // College-level entries get the graduation cap, everything else an open book.
  const isCollege = /college|bachelor|university|master/i.test(item.program);
  const Icon = isCollege ? GraduationCap : BookOpen;

  return (
    <li className="relative pl-12 md:grid md:grid-cols-2 md:gap-x-20 md:pl-0">
      {/* ---------- Node on the line ---------- */}
      <motion.span
        initial={reduce ? false : { scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="absolute left-4 top-5 z-10 -translate-x-1/2 md:left-1/2"
      >
        {index === 0 && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-foreground/20 motion-safe:animate-ping"
          />
        )}
        <span className="relative inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-[0_8px_20px_-10px_var(--surface-shadow)]">
          <Icon className="size-4" />
        </span>
      </motion.span>

      {/* ---------- Period, opposite the card (desktop only) ---------- */}
      <div
        className={cn(
          "hidden md:row-start-1 md:flex md:items-start md:pt-6",
          onRight
            ? "md:col-start-1 md:justify-end md:text-right"
            : "md:col-start-2"
        )}
      >
        <p className="font-display text-xl font-medium text-foreground/80">
          {item.period}
        </p>
      </div>

      {/* ---------- Card ---------- */}
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "surface surface-hover p-5 sm:p-6 md:row-start-1",
          onRight ? "md:col-start-2" : "md:col-start-1"
        )}
      >
        <div
          className={cn(
            "flex flex-wrap items-center gap-2",
            !item.current && "md:hidden"
          )}
        >
          {/* Period badge: phones only, because desktop shows it beside the line */}
          <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground md:hidden">
            {item.period}
          </span>
          {item.current && (
            <span className="rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
              Current
            </span>
          )}
        </div>

        {/* Level label, e.g. "College" / "Senior High School" */}
        <p
          className={cn(
            "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
            item.current ? "mt-3" : "mt-3 md:mt-0"
          )}
        >
          {item.program}
        </p>

        {/* School name */}
        <h3 className="mt-1 text-balance text-lg font-semibold sm:text-xl">
          {item.school}
        </h3>

        {/* Strand / degree: the line with the accent bar on its left */}
        {item.course && (
          <p className="mt-3 border-l-2 border-foreground/25 pl-3 text-sm leading-relaxed text-foreground/90 sm:text-base">
            {item.course}
          </p>
        )}

        {item.note && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {item.note}
          </p>
        )}

        {item.highlights?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.highlights.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </motion.article>
    </li>
  );
}
