import { motion, useReducedMotion } from "motion/react";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Organizations: one card per organization, each with a small "role ladder"
 * (newest role on top, joined by a thin rail with dots).
 *
 * RESPONSIVE (mobile first)
 *   - Phones (< sm):   cards stacked, compact padding. Each role is a title
 *                      with its period chip underneath.
 *   - Tablets (sm):    still stacked (each card is wide enough), but roles
 *                      switch to a row: title on the left, period chip on the
 *                      right.
 *   - Desktop (lg+):   two columns. The first organization takes 7/12, the
 *                      second 5/12. Cards keep their own height
 *                      (`items-start`) so a short card is not stretched.
 *   - Period chips never wrap (`whitespace-nowrap`); titles and names wrap
 *     (`break-words`, `min-w-0`) so long names fit on small phones.
 *
 * DATA: ORGANIZATIONS in experience.data.js, as
 *   { name, short?, roles: [{ title, period, current? }] }
 *
 * ANIMATION: cards fade up when first scrolled into view; reduced-motion
 * visitors see everything immediately.
 */
export default function Organizations({
  items = [],
  eyebrow = "Beyond work",
  title = "Organizations & Affiliations",
}) {
  const reduce = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <div id="organizations" className="mt-14 scroll-mt-24 sm:mt-20 md:mt-24">
      {/* ---------- Heading row ---------- */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-balance text-xl font-semibold sm:text-2xl md:text-3xl">
          {title}
        </h3>
      </div>

      {/* ---------- Cards ---------- */}
      <ul className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:items-start">
        {items.map((org, i) => (
          <motion.li
            key={org.id ?? org.name}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              "surface surface-hover min-w-0 p-4 sm:p-6",
              i === 0 ? "lg:col-span-7" : "lg:col-span-5"
            )}
          >
            {/* Card header: icon, name, abbreviation chip */}
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-foreground sm:size-11">
                <Users className="size-4 sm:size-5" />
              </span>
              <div className="min-w-0">
                <h4 className="text-balance break-words text-base font-semibold leading-snug sm:text-lg">
                  {org.name}
                </h4>
                {org.short && (
                  <span className="mt-1.5 inline-block rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-xs text-muted-foreground">
                    {org.short}
                  </span>
                )}
              </div>
            </div>

            {/* Role ladder */}
            <ol className="relative mt-5 space-y-4 pl-6 sm:mt-6">
              {/* Rail */}
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-[5px] top-1 w-px bg-linear-to-b from-foreground/40 via-border to-transparent"
              />

              {org.roles.map((role) => (
                <li
                  key={role.title + role.period}
                  className="relative flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  {/* Dot on the rail */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-6 top-1.5 size-2.5 rounded-full border border-border bg-background",
                      role.current && "border-foreground bg-foreground"
                    )}
                  />
                  <p className="min-w-0 break-words text-sm font-medium leading-snug sm:text-base">
                    {role.title}
                    {role.current && (
                      <span className="ml-2 rounded-full bg-foreground px-2 py-0.5 align-middle text-[10px] font-medium uppercase tracking-wide text-background">
                        Current
                      </span>
                    )}
                  </p>
                  <span className="w-fit shrink-0 whitespace-nowrap rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-xs text-muted-foreground">
                    {role.period}
                  </span>
                </li>
              ))}
            </ol>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
