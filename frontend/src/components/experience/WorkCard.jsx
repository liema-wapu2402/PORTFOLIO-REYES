import { motion, useReducedMotion } from "motion/react";
import { Briefcase, Check } from "lucide-react";

/**
 * WorkCard: one job / internship.
 *
 * RESPONSIVE (mobile first)
 *   - Phones (< sm):   compact padding. A header strip on top holds the icon,
 *                      period + type and the "Current" badge; a thin divider
 *                      separates it from the role and bullets below.
 *   - Tablets (sm):    same stacked layout with roomier padding and larger text.
 *   - Small laptops (md): two columns. A narrow left rail (11.5rem) holds the
 *                      icon, period, type and badge, split from the content by
 *                      a vertical line.
 *   - Desktop (lg+):   the left rail widens to 14rem and the text grows.
 *   - Long words / titles wrap (`break-words`, `min-w-0`) so nothing ever
 *     pushes the page sideways on a narrow phone.
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
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="surface surface-hover grid min-w-0 gap-4 p-4 sm:gap-5 sm:p-6 md:grid-cols-[11.5rem_minmax(0,1fr)] md:gap-7 md:p-7 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-9 lg:p-8"
    >
      {/* ---------- Header strip (phones) / left rail (md+) ---------- */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border/60 pb-4 md:flex-col md:items-start md:gap-4 md:border-b-0 md:border-r md:pb-0 md:pr-6">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-foreground sm:size-11">
          <Briefcase className="size-4 sm:size-5" />
        </span>

        <div className="min-w-0 flex-1 md:flex-none">
          <p className="text-balance font-display text-sm font-medium text-foreground/90 sm:text-base lg:text-lg">
            {item.period}
          </p>
          {item.type && (
            <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:mt-1 sm:text-xs">
              {item.type}
            </p>
          )}
        </div>

        {item.current && (
          <span className="shrink-0 rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
            Current
          </span>
        )}
      </div>

      {/* ---------- Role, company, bullets ---------- */}
      <div className="min-w-0">
        <h3 className="text-balance break-words text-lg font-semibold leading-snug sm:text-xl lg:text-2xl">
          {item.role}
        </h3>
        <p className="mt-2 break-words border-l-2 border-foreground/25 pl-3 text-sm text-foreground/90 sm:text-base">
          {item.company}
        </p>

        {item.points?.length > 0 && (
          <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
            {item.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                <Check className="mt-1 size-4 shrink-0 text-foreground/60" />
                <span className="min-w-0 text-pretty break-words">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}