import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

/**
 * GSAP setup for the HRCM site. GSAP owns the choreographed, scroll-driven
 * moments (hero entrance, claim-flow background, section reveals);
 * framer-motion stays responsible for interaction feedback (hover, drag,
 * press) where its spring physics are the better tool.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

// Restrained, premium motion defaults
gsap.defaults({ duration: 0.8, ease: "power3.out" });

export { gsap, ScrollTrigger, MotionPathPlugin };

/** True when the visitor asked for reduced motion — animations no-op. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * True when animations should be skipped entirely so content renders in its
 * final state: reduced motion, or a hidden/background tab where rAF and
 * timers are throttled (reveals would otherwise stay invisible).
 */
export function shouldSkipAnimation(): boolean {
  return (
    prefersReducedMotion() ||
    (typeof document !== "undefined" && document.visibilityState === "hidden")
  );
}

/** Standard reveal easing for scroll-triggered elements. */
export const REVEAL_EASE = "power3.out";

/** Failsafe: force a timeline to its end if a throttled webview stalls it. */
export function withFailsafe(tl: gsap.core.Timeline, ms = 2200) {
  window.setTimeout(() => {
    if (tl.progress() < 1) tl.progress(1);
  }, ms);
  return tl;
}
