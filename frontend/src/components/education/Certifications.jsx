import { motion, useReducedMotion } from "motion/react";
import {
  Award,
  Box,
  Briefcase,
  Server,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Certifications: a bento-style grid of "certificate" cards, deliberately
 * different from the timeline above it.
 *
 * LAYOUT (mobile first)
 *   - Phones (< sm):  1 column, cards stacked.
 *   - Tablets (sm):   2 columns. If the number of cards is odd, the last one
 *                     stretches across both columns so there is no gap.
 *   - Desktop (lg+):  a 6-column grid. The first two cards take 3 columns each
 *                     (featured, wider), the rest take 2 columns each (three per row).
 *
 * CARD ANATOMY
 *   - icon tile (top-left) + year chip (top-right)
 *   - big faded index number in the corner (decoration only)
 *   - title, then a footer line with the issuer
 *   - a thin accent line along the top that draws in on hover
 *
 * DATA: each item is { title, issuer, year } from CERTIFICATIONS in
 * education.data.js. The icon is picked from keywords in the title, and falls
 * back to the award icon, so you never have to set one by hand.
 *
 * ANIMATION: cards fade up one after another when first scrolled into view.
 * Visitors who prefer reduced motion see everything immediately.
 */

// Pick an icon from the certificate title. First match wins.
const ICON_RULES = [
  [/malware|threat|security/i, ShieldCheck],
  [/3d|hardware|printing/i, Box],
  [/web|system administration|server/i, Server],
  [/fix|repair|computer systems/i, Wrench],
  [/workforce|industry|career/i, Briefcase],
];

function pickIcon(title = "") {
  const rule = ICON_RULES.find(([pattern]) => pattern.test(title));
  return rule ? rule[1] : Award;
}

// Column span on desktop: first two cards are featured (wider).
function desktopSpan(index, total) {
  if (total <= 2) return "lg:col-span-3";
  return index < 2 ? "lg:col-span-3" : "lg:col-span-2";
}

export default function Certifications({
  items = [],
  eyebrow = "Beyond the classroom",
  title = "Seminars & Workshops",
}) {
  const reduce = useReducedMotion();

  if (items.length === 0) return null;

  const total = items.length;
  const lastIsOrphanOnTablet = total % 2 === 1;

  return (
    <div className="mt-20 md:mt-24">
      {/* ---------- Heading row ---------- */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-balance text-2xl font-semibold sm:text-3xl">
            {title}
          </h3>
        </div>
        <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground sm:text-sm">
          {total} {total === 1 ? "certificate" : "certificates"}
        </span>
      </div>

      {/* ---------- Grid ---------- */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {items.map((cert, i) => {
          const Icon = pickIcon(cert.title);
          const isLast = i === total - 1;

          return (
            <motion.li
              key={cert.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group surface surface-hover relative flex flex-col overflow-hidden p-5 sm:p-6",
                desktopSpan(i, total),
                isLast && lastIsOrphanOnTablet && "sm:col-span-2"
              )}
            >
              {/* Accent line that draws in along the top on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-foreground/60 via-foreground/20 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />

              {/* Big faded index number (decoration) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 -right-1 select-none font-display text-8xl font-semibold leading-none text-foreground/[0.05] sm:text-9xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Top row: icon tile + year */}
              <div className="relative flex items-start justify-between gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/60 text-foreground transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon className="size-5" />
                </span>
                {cert.year && (
                  <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">
                    {cert.year}
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="relative mt-5 text-balance text-base font-semibold leading-snug sm:text-lg">
                {cert.title}
              </h4>

              {/* Footer: issuer */}
              <div className="relative mt-auto flex items-center gap-2 border-t border-border/60 pt-4 text-sm text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-foreground/40"
                />
                <span className="min-w-0 truncate">{cert.issuer}</span>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
