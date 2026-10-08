import { motion, useReducedMotion } from "motion/react";
import { Briefcase, Check } from "lucide-react";

/**
 * WorkCard: one job / internship.
 *
 * LAYOUT (mobile first)
 *   - Phones (< md): a single card. The period is a small badge at the top.
 *   - Desktop (md+): a two-column card. A narrow left rail holds the icon,
 *     period and type; the right side holds the role, company and bullets.
 *
 * ANIMATION: fades up once when first scrolled into view. Visitors who prefer
 * reduced motion see it immediately.
 */
export default function WorkCard({ item, index = 0 }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="surface surface-hover grid gap-5 p-5 sm:p-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8 md:p-8"
    >
      {/* ---------- Left rail: icon, period, type ---------- */}
      <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-start md:gap-4 md:border-r md:border-border/60 md:pr-6">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/60 text-foreground">
          <Briefcase className="size-5" />
        </span>

        <div className="min-w-0">
          <p className="font-display text-base font-medium text-foreground/90 sm:text-lg">
            {item.period}
          </p>
          {item.type && (
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {item.type}
            </p>
          )}
        </div>

        {item.current && (
          <span className="rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
            Current
          </span>
        )}
      </div>

      {/* ---------- Right: role, company, bullets ---------- */}
      <div className="min-w-0">
        <h3 className="text-balance text-lg font-semibold sm:text-xl">
          {item.role}
        </h3>
        <p className="mt-1 border-l-2 border-foreground/25 pl-3 text-sm text-foreground/90 sm:text-base">
          {item.company}
        </p>

        {item.points?.length > 0 && (
          <ul className="mt-4 space-y-2.5">
            {item.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                <Check className="mt-1 size-4 shrink-0 text-foreground/60" />
                <span className="min-w-0">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
