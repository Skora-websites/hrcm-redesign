import { useEffect, useRef, useState } from "react";
import { gsap, shouldSkipAnimation } from "../lib/gsap";

/**
 * Count a before/after pair up when the element scrolls into view.
 * Driven by GSAP tween + ScrollTrigger; returns [ref, beforeDisplay, afterDisplay].
 */
export function useCountUpPair(
  before: number,
  after: number,
  opts: { duration?: number; decimals?: number } = {},
) {
  const { duration = 1.4, decimals = 0 } = opts;
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState({ before: 0, after: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const counter = { b: 0, a: 0 };
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        setValues({ before, after });
      }
    };

    if (shouldSkipAnimation()) {
      finish();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            io.disconnect();
            gsap.to(counter, {
              b: before,
              a: after,
              duration,
              ease: "power2.out",
              onUpdate: () => setValues({ before: counter.b, after: counter.a }),
              onComplete: finish,
            });
            // Fail-safe: even if rAF is throttled, land on final values
            window.setTimeout(finish, duration * 1000 + 1500);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      done = true;
    };
  }, [before, after, duration]);

  return [
    ref,
    values.before.toFixed(decimals),
    values.after.toFixed(decimals),
  ] as const;
}
