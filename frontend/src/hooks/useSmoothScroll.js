import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useSmoothScroll
 * ---------------
 * Inertia ("buttery") scrolling with Lenis, wired into GSAP so that
 * ScrollTrigger animations (see effects/ScrollReveal.jsx) stay in sync.
 *
 * Skipped completely when the visitor prefers reduced motion.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // lerp = how much of the remaining distance is covered per frame.
    // Smaller = floatier, larger = snappier.
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });

    // Tell ScrollTrigger every time Lenis moves the page.
    lenis.on('scroll', ScrollTrigger.update);

    // Let GSAP's ticker drive Lenis' animation loop (one shared loop).
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
