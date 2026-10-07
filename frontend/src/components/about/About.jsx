import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  LayoutGrid,
  MousePointerClick,
  Sparkles,
} from "lucide-react";
import { SITE } from "@/data/site";
import { scrollToSection } from "@/lib/scrollToSection";
import { Section, SectionHeading } from "@/components/layout";
import ScrollReveal from "@/components/effects/ScrollReveal";
import profileImage from "@/assets/aacr_profile.jpg";

/**
 * Three short "what I care about" cards under the paragraph. They summarise the
 * paragraph in SITE.about (data/site.js). Edit the text or swap the icons freely.
 */
const FOCUS = [
  {
    icon: Sparkles,
    title: "Motion & interaction",
    text: "Smooth transitions and small details that make an interface feel alive.",
  },
  {
    icon: LayoutGrid,
    title: "Layout & timing",
    text: "Experimenting with layouts, animation and timing until things feel natural.",
  },
  {
    icon: MousePointerClick,
    title: "Flow & usability",
    text: "From early visual ideas to refined, cohesive interfaces that are easy to use.",
  },
];

/**
 * About: a two-column layout on large screens, stacked on phones and tablets.
 *
 *   LEFT  : a profile card (your photo, name, roles, buttons). From `lg` up it is
 *           `sticky`, so it stays in view while you read the longer right column.
 *   RIGHT : the paragraph (revealed word by word while you scroll) + three focus cards.
 *
 * RESPONSIVE NOTES
 *   - `lg:grid-cols-[...]` only kicks in from 1024px; below that everything stacks.
 *   - The profile card is a row on tablets (`sm:flex-row`) and a column on desktop
 *     (`lg:flex-col`), so it never looks stretched on wide-but-short screens.
 *   - The photo lives at src/assets/aacr_profile.jpg. Replace that file to change it.
 *   - The focus cards are 1 column on phones, 3 columns from `sm`.
 *   - The Section does NOT use overflow-hidden, because that would break `sticky`.
 *
 * ANIMATION: each block fades up once when it first enters the screen. Visitors who
 * prefer reduced motion see everything immediately (`initial: false`).
 */
export default function About() {
  const reduce = useReducedMotion();

  // Props shared by every block that fades up when scrolled into view.
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <Section id="about" className="isolate">
      {/* ---------- Background (same family as Education / Skills) ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_90%_30%,var(--glow),transparent)] opacity-60" />
      </div>

      <SectionHeading
        title="About me"
        description="A little about how I work and what I enjoy building."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        {/* ================= LEFT: profile card ================= */}
        <motion.aside
          {...reveal(0)}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <div className="surface flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8 lg:flex-col lg:items-start lg:gap-7">
            {/* Profile photo.
                - `aspect-square` keeps it square at every size; `object-cover object-top`
                  fills the tile and keeps the face (not the shoulders) in frame.
                - Phones: centred, capped at 16rem wide. Tablets: a fixed 11rem tile beside
                  the text. Desktop: full width of the card.
                - `dark:brightness-90` stops the white photo background from glaring in dark mode. */}
            <div className="relative aspect-square w-full max-w-64 shrink-0 self-center overflow-hidden rounded-xl border border-border/70 bg-background/50 sm:w-44 sm:max-w-none sm:self-auto lg:w-full">
              <img
                src={profileImage}
                alt={`Portrait of ${SITE.fullName}`}
                width={418}
                height={418}
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-top dark:brightness-90"
              />
              {/* Small initials badge in the corner */}
              <span className="absolute bottom-2.5 left-2.5 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 font-display text-xs font-semibold backdrop-blur">
                {SITE.initials}
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="text-balance text-xl font-semibold sm:text-2xl">
                {SITE.fullName}
              </h3>

              <ul className="mt-4 flex flex-wrap gap-2">
                {SITE.roles.map((role) => (
                  <li
                    key={role}
                    className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground sm:text-sm"
                  >
                    {role}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  className="btn-solid"
                >
                  Get in touch
                </a>
                {/* Only rendered when a resume link is set in data/site.js */}
                {SITE.resumeUrl && (
                  <a
                    href={SITE.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-soft"
                  >
                    Resume
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.aside>

        {/* ================= RIGHT: story + focus cards ================= */}
        <div className="min-w-0 space-y-6">
          <motion.div {...reveal(0.08)} className="surface p-6 sm:p-8 lg:p-10">
            {/* Soft arctic glow in the card's top-right corner */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,var(--glow),transparent)] opacity-60"
            />
            {/* Thin accent line on the left, like a pull-quote */}
            <div
              aria-hidden="true"
              className="absolute inset-y-6 left-0 w-0.5 rounded-full bg-linear-to-b from-foreground/40 via-foreground/15 to-transparent sm:inset-y-8"
            />
            <ScrollReveal
              baseOpacity={0.12}
              enableBlur
              baseRotation={0}
              blurStrength={6}
              containerClassName="relative"
              textClassName="text-lg leading-relaxed text-foreground/90 font-normal sm:text-xl xl:text-2xl"
            >
              {SITE.about}
            </ScrollReveal>
          </motion.div>

          <ul className="grid gap-4 sm:grid-cols-3">
            {FOCUS.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                {...reveal(0.12 + i * 0.08)}
                className="surface surface-hover p-5"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background/60 text-foreground">
                  <Icon className="size-5" />
                </span>
                <h4 className="mt-4 font-semibold">{title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
