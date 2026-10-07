import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal
 * ------------
 * Splits a string into words and, as the paragraph scrolls into view, fades each
 * word from `baseOpacity` to 1 (and optionally from blurred to sharp).
 *
 * Changes from the original version:
 *  - Uses gsap.context() so cleanup only removes THIS component's animations
 *    (the old code killed every ScrollTrigger on the page).
 *  - Renders a <div><p> instead of <h2><p>, because a paragraph is not a heading.
 *  - Font size comes only from `textClassName`, so Tailwind classes no longer
 *    fight a hard-coded clamp().
 *  - Shows the plain text, with no animation, for visitors who prefer reduced motion.
 */
const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}) => {
  const containerRef = useRef(null);

  // Wrap every word in <span class="word"> so GSAP can animate them one by one.
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) return word;
      return (
        <span className="word inline-block" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scroller = scrollContainerRef?.current ?? window;

    const ctx = gsap.context(() => {
      // A slight rotation that settles to 0 as the block scrolls up.
      if (baseRotation) {
        gsap.fromTo(
          el,
          { transformOrigin: '0% 50%', rotate: baseRotation },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: { trigger: el, scroller, start: 'top bottom', end: rotationEnd, scrub: true },
          }
        );
      }

      const words = el.querySelectorAll('.word');

      // Words fade in one after another. `scrub: true` ties progress to the scrollbar.
      gsap.fromTo(
        words,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: { trigger: el, scroller, start: 'top bottom-=20%', end: wordAnimationEnd, scrub: true },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          words,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: { trigger: el, scroller, start: 'top bottom-=20%', end: wordAnimationEnd, scrub: true },
          }
        );
      }
    }, el);

    // revert() kills only the animations created inside this context.
    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={containerClassName}>
      <p className={textClassName}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal;
