import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

/**
 * Scroll-triggered reveal for the element's children (or itself).
 * Replaces the old framer-motion `Reveal` component and `whileInView` cards.
 *
 * data attributes on the host element:
 *  - data-reveal="up"           (default) children fade/slide in
 *  - data-reveal-stagger="0.08" seconds between children
 */
export function useGsapReveal<T extends HTMLElement>(
  opts: { stagger?: number; y?: number; duration?: number; selector?: string } = {},
) {
  const ref = useRef<T>(null);
  const { stagger = 0.08, y = 28, duration = 0.7, selector } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const targets = selector ? el.querySelectorAll(selector) : el.children;
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, y, duration, selector]);

  return ref;
}
