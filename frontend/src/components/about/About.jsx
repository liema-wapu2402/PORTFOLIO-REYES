import { SITE } from '@/data/site';
import { Section, SectionHeading } from '@/components/layout';
import ScrollReveal from '@/components/effects/ScrollReveal';

/**
 * About: the paragraph is revealed word by word as you scroll (ScrollReveal).
 * The text itself lives in data/site.js (SITE.about).
 */
export default function About() {
  return (
    <Section id="about">
      <SectionHeading title="About me" />
      <div className="surface p-6 sm:p-10">
        {/* Soft arctic glow inside the card: a radial gradient from the top-right corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,var(--glow),transparent)] opacity-60"
        />
        <ScrollReveal
          baseOpacity={0.12}
          enableBlur
          baseRotation={0}
          blurStrength={6}
          containerClassName="relative"
          textClassName="text-lg leading-relaxed sm:text-xl md:text-2xl text-foreground/90 font-normal"
        >
          {SITE.about}
        </ScrollReveal>
      </div>
    </Section>
  );
}
