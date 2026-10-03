import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Restrained, premium motion defaults (brief §12)
gsap.defaults({ duration: 0.7, ease: "power3.out" });

export { gsap, ScrollTrigger };

/** True when the user prefers reduced motion — animations should no-op. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
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

/**
 * Scroll-triggered reveal that fires once when `scope` crosses `start`.
 * If the tab is hidden/reduced-motion, nothing is created (content stays
 * visible). A timeout safety-net snaps the tween to its final state even if
 * the ticker is throttled after activation.
 */
export function revealOnScroll(
  scope: HTMLElement,
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
  start = "top 85%",
) {
  if (shouldSkipAnimation()) return;
  const duration = typeof vars.duration === "number" ? vars.duration : 0.7;
  const stagger = typeof vars.stagger === "number" ? vars.stagger : 0;
  const tween = gsap.from(targets, {
    ...vars,
    scrollTrigger: {
      trigger: scope,
      start,
      once: true,
      onEnter: () => {
        window.setTimeout(() => {
          if (tween.progress() < 1) tween.progress(1);
        }, duration * 1000 + stagger * 1000 + 1200);
      },
    },
  });
  return tween;
}
