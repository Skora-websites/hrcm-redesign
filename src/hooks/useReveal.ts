import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/gsap";

/**
 * Class-based scroll reveal driven by IntersectionObserver (event-driven,
 * independent of requestAnimationFrame, so it works even in fully throttled
 * webviews). Elements start visible by default; the .will-reveal class is
 * added only when the observer is actually attached — so if anything fails,
 * content simply shows without animation instead of staying hidden.
 *
 * Usage: attach the returned ref to a container; direct children (or
 * `selector` matches) get the reveal. Adds .is-inview when they enter.
 */
export function useReveal<T extends HTMLElement>(
  opts: { selector?: string; threshold?: number } = {},
) {
  const ref = useRef<T>(null);
  const { selector, threshold = 0.12 } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const targets = (
      selector ? Array.from(el.querySelectorAll(selector)) : Array.from(el.children)
    ) as HTMLElement[];
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    for (const t of targets) {
      // Only hide elements still below the viewport; anything already on
      // screen (e.g. after anchor jumps) reveals instantly via transition.
      const r = t.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.9) {
        t.classList.add("will-reveal");
        io.observe(t);
      }
    }

    return () => io.disconnect();
  }, [selector, threshold]);

  return ref;
}
