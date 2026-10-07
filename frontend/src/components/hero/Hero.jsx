import { lazy, Suspense, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";
import { scrollToSection } from "@/lib/scrollToSection";
import RotatingText from "@/components/effects/RotatingText";

/**
 * The moving robot (Spline 3D scene, carried over from the first portfolio).
 *
 * It is loaded with React.lazy so the heavy Spline runtime is split into its
 * own chunk and downloaded AFTER the page's text has already rendered, instead
 * of blocking the first paint.
 * To swap the robot, replace this URL with another Spline scene's .splinecode link.
 */
const Spline = lazy(() => import("@splinetool/react-spline"));
const ROBOT_SCENE =
  "https://prod.spline.design/9xuF1oRA5poA131s/scene.splinecode";

/**
 * Hero: the first screen.
 *
 * LAYERS (back to front). All background layers are `absolute` inside a wrapper
 * that has `-z-10`, so the text always sits on top. `isolate` on the <section>
 * creates its own stacking context so -z-10 can never slip behind the page body.
 *
 *   1. vertical wash   : arctic gray at the top fading into the page colour
 *   2. radial glow     : a soft arctic haze in the top-left corner
 *   3. grid            : the .bg-grid pattern from index.css, masked to fade out
 *   4. giant monogram  : "AACR" in huge, faded type at the bottom right
 *
 * ENTRANCE: elements use `animate-rise` (defined in index.css) with different
 * animation-delay values so they appear one after another on page load.
 * That is the only automatic animation on the page.
 */
export default function Hero() {
  // Flips to true when the Spline scene finishes loading, which fades the robot in.
  const [robotReady, setRobotReady] = useState(false);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh items-center overflow-hidden pb-20 pt-28"
    >
      {/* ---------- Background ---------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* 1. Vertical wash.
            bg-linear-to-b = gradient top -> bottom.
            from-arctic-100 is a pale arctic gray in light mode; in dark mode
            `dark:from-arctic-900/60` swaps to a deep graphite at 60% opacity.
            `to-background` lets the gradient end exactly on the page colour,
            so there is no visible seam with the next section. */}
        <div className="absolute inset-0 bg-linear-to-b from-arctic-100 via-background to-background dark:from-arctic-900/60" />

        {/* 2. Radial glow.
            Arbitrary value syntax: bg-[radial-gradient(...)] is raw CSS where
            underscores stand for spaces. "55%_45%_at_15%_0%" = an ellipse 55% wide,
            45% tall, centred 15% from the left on the top edge. var(--glow) is the
            theme-aware haze colour; it fades to transparent. */}
        <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_15%_0%,var(--glow),transparent)]" />

        {/* 3. Grid (see .bg-grid in index.css) */}
        <div className="bg-grid absolute inset-0" />

        {/* 4. Giant monogram.
            .text-fade paints the letters with a top-to-bottom fade.
            clamp(min, preferred, max) lets the size grow with the viewport:
            never below 6rem, never above 20rem, ~22% of the viewport width between.
            It is anchored to the bottom-right (`right-0 bottom-0`) and pushed down
            with `translate-y-[22%]` so only the top of the letters shows; on phones
            it is hidden (`hidden sm:block`) so it never sits behind the text.
            `select-none` keeps it from being highlighted. */}
        <span className="text-fade pointer-events-none absolute -right-2 bottom-0 hidden translate-y-[22%] select-none font-display text-[clamp(6rem,22vw,20rem)] font-semibold leading-none opacity-[0.14] dark:opacity-[0.12] sm:block">
          {SITE.initials}
        </span>
      </div>

      {/* ---------- Content ----------
          Two columns from `lg` up: text on the left, the robot on the right.
          Below `lg` they stack (text first, robot underneath). */}
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-6">
        <div>
          <p className="animate-rise mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur [animation-delay:0ms]">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            Portfolio of {SITE.firstName}
          </p>

          {/* The name fades from solid to soft (.text-fade), as one phrase. */}
          <h1 className="text-fade animate-rise max-w-4xl text-balance text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl [animation-delay:120ms]">
            {SITE.fullName}
          </h1>

          <div className="animate-rise mt-5 text-xl text-foreground/90 sm:text-2xl [animation-delay:240ms]">
            <RotatingText
              texts={SITE.roles}
              mainClassName="font-display"
              splitLevelClassName="overflow-hidden pb-1"
              staggerDuration={0.03}
              staggerFrom="first"
              rotationInterval={3200}
            />
          </div>

          <p className="animate-rise mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg [animation-delay:360ms]">
            {SITE.tagline}
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3 [animation-delay:480ms]">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
              className="btn-solid"
            >
              View my work
              <ArrowDown className="size-4" />
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

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="btn-soft"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* ---------- Robot (Spline) ----------
            The scene is interactive: it follows the cursor, so this box must
            receive pointer events (it does by default; nothing overlaps it).
            The mask softly fades the edges so the scene blends into the page. */}
        <div
          role="img"
          aria-label="Interactive 3D robot"
          className="relative h-[22rem] w-full overflow-hidden sm:h-[28rem] lg:h-[34rem] xl:h-[38rem]"
          style={{
            WebkitMaskImage:
              "radial-gradient(closest-side, #000 65%, transparent 100%)",
            maskImage:
              "radial-gradient(closest-side, #000 65%, transparent 100%)",
          }}
        >
          {/* The Spline canvas is made 4rem taller than this box on the top and
              bottom (-inset-y-16) and the box clips the overflow (overflow-hidden).
              Spline draws its "Built with Spline" badge in the canvas's bottom
              corner, so that corner ends up outside the visible area. The robot
              stays centred because the extra space is equal on both sides. */}
          <div className="absolute inset-x-0 -inset-y-16">
            <Suspense fallback={null}>
              <Spline
                scene={ROBOT_SCENE}
                onLoad={() => setRobotReady(true)}
                className={`!h-full !w-full transition-opacity duration-1000 ${robotReady ? "opacity-100" : "opacity-0"}`}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
