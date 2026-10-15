import { useRef, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Activity, FileCode, Radar, Scale, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

/**
 * HeroObject — the hero's centrepiece.
 *
 * The HRCM AI software, shown as a translucent glass workspace rather than a
 * claims board: an intelligent core (concentric rings + a live ECG pulse that
 * echoes the logo's heartbeat) with capability tiles around it. Built with the
 * same real 3D transforms as before —
 *
 *   group 1 — the scroll tumble (rotateX + y + scale as the hero leaves)
 *   group 2 — the pointer tilt (springs, ±16° / ±12°)
 *   group 3 — a continuous showcase turn, so the object never sits still
 *
 * The glass is green/teal to sit in the logo's pastel studio, and far
 * satellites are blurred for depth-of-field. Inert under reduced motion.
 *
 * NOTE: the capability tiles below are domain placeholders (audit, coding,
 * AR, reconciliation) pending the client's AI-software feature list — swap the
 * CAPABILITIES array for the exact copy when it arrives.
 */

const EASE_SPRING = { stiffness: 120, damping: 18, mass: 0.7 };

/** Capability tiles shown around the core. Placeholder copy — replace with the
 *  real HRCM AI feature list (the source PDF could not be read by this tool). */
const CAPABILITIES = [
  { label: "Denial intelligence", Glyph: ShieldCheck },
  { label: "Auto-coding", Glyph: FileCode },
  { label: "Predictive AR", Glyph: TrendingUp },
  { label: "Reconciliation", Glyph: Scale },
];

/** ECG heartbeat path — the logo's pulse, drawn as a signal across the core. */
const ECG =
  "M0 60 H44 l6 -26 l9 52 l8 -34 l5 8 H96 l9 -20 l7 30 l5 -10 H200";

export function HeroObject({ className = "" }: { className?: string }) {
  const scene = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const flat = reduce === true;

  /* ---- pointer tilt ---- */
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, EASE_SPRING);
  const sy = useSpring(py, EASE_SPRING);
  const tiltY = useTransform(sx, [0, 1], [16, -16]);
  const tiltX = useTransform(sy, [0, 1], [-12, 12]);

  /* ---- scroll tumble ---- */
  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ["start end", "end start"],
  });
  const scrollRotX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -14]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [40, -70]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.06]);

  /* ---- specular highlight tracks the light ---- */
  const sheenX = useTransform(sx, [0, 1], ["18%", "82%"]);
  const sheenY = useTransform(sy, [0, 1], ["12%", "70%"]);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (flat) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onPointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  /** Plain-layer depth (no animation on that element). */
  const z = (depth: number): CSSProperties => ({ transform: `translateZ(${depth}px)` });

  return (
    <div
      ref={scene}
      className={`relative isolate ${className}`}
      style={{ perspective: "1300px" }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* ---- group 1: the scroll tumble ---- */}
      <motion.div
        className="relative mx-auto w-full max-w-[23rem]"
        style={{
          transformStyle: "preserve-3d",
          rotateX: flat ? 0 : scrollRotX,
          y: flat ? 0 : scrollY,
          scale: flat ? 1 : scrollScale,
        }}
      >
        {/* ---- group 2: pointer tilt + idle float ---- */}
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            rotateX: flat ? 0 : tiltX,
            rotateY: flat ? 0 : tiltY,
          }}
          animate={flat ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* ---- group 3: continuous showcase turn ---- */}
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            animate={flat ? undefined : { rotateY: [-22, 22, -22] }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* ============ the glass AI workspace ============ */}
            <div className="relative" style={{ transformStyle: "preserve-3d" }}>
              {/* coloured refraction inside the glass — green/teal */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 rounded-[44px] opacity-70 blur-xl"
                style={{
                  ...z(-60),
                  background:
                    "radial-gradient(60% 60% at 20% 20%, rgba(244,250,238,0.65), transparent 70%), radial-gradient(50% 50% at 85% 30%, rgba(21,154,140,0.28), transparent 70%), radial-gradient(60% 60% at 60% 95%, rgba(155,189,132,0.42), transparent 70%)",
                }}
              />

              {/* glass body — the rim gradient stands in for the glass edge */}
              <div
                className="relative rounded-[38px] p-[1.5px]"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(255,255,255,0.98) 0%, rgba(244,250,238,0.6) 34%, rgba(188,223,162,0.42) 56%, rgba(255,255,255,0.78) 100%)",
                  boxShadow:
                    "0 2px 6px rgba(27,42,21,0.05), 0 30px 70px -28px rgba(27,42,21,0.4), 0 70px 130px -60px rgba(21,154,140,0.32)",
                }}
              >
                <div
                  className="relative overflow-hidden rounded-[37px] p-5 sm:p-6"
                  style={{
                    // No backdrop-filter here: a filtered element flattens its
                    // subtree, which would destroy the internal Z-depth. The
                    // layered gradients + specular carry the glass read instead.
                    background:
                      "linear-gradient(150deg, rgba(255,255,255,0.92) 0%, rgba(244,250,238,0.82) 45%, rgba(211,236,189,0.86) 100%)",
                  }}
                >
                  {/* specular streak — tracks the pointer */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute h-[190%] w-24 -rotate-[18deg] rounded-full"
                    style={{
                      left: flat ? "40%" : sheenX,
                      top: flat ? "30%" : sheenY,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0) 100%)",
                      filter: "blur(10px)",
                    }}
                  />

                  {/* top gloss */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-2 top-0 h-1/2 rounded-b-[60%] opacity-60"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)",
                    }}
                  />

                  {/* ---- content, layered in Z ---- */}
                  <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                    {/* header */}
                    <div className="relative flex items-center justify-between gap-3" style={z(46)}>
                      <span className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5aa318] opacity-70" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5aa318]" />
                        </span>
                        <span className="text-[0.9rem] font-semibold text-studio-950">
                          HRCM AI
                        </span>
                      </span>
                      <span className="tabular rounded-full border border-white/70 bg-white/70 px-2.5 py-0.5 text-[0.7rem] font-medium text-studio-700">
                        Live
                      </span>
                    </div>

                    {/* the intelligent core — concentric rings + ECG pulse */}
                    <div
                      className="relative mt-4 flex h-40 items-center justify-center"
                      style={z(34)}
                    >
                      {/* concentric rings, echoing the logo's arc */}
                      <span
                        aria-hidden
                        className="absolute h-36 w-36 rounded-full border border-[#5aa318]/20"
                      />
                      <span
                        aria-hidden
                        className="absolute h-24 w-24 rounded-full border border-[#159a8c]/25"
                      />
                      <motion.span
                        aria-hidden
                        className="absolute h-12 w-12 rounded-full bg-[#5aa318]/12"
                        animate={flat ? undefined : { scale: [1, 1.18, 1], opacity: [0.7, 0.35, 0.7] }}
                        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {/* radar sweep */}
                      {!flat && (
                        <motion.span
                          aria-hidden
                          className="absolute h-36 w-36 rounded-full"
                          style={{
                            background:
                              "conic-gradient(from 0deg, rgba(21,154,140,0.28) 0deg, rgba(21,154,140,0) 60deg, rgba(21,154,140,0) 360deg)",
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      {/* ECG heartbeat — the logo's pulse */}
                      <svg
                        viewBox="0 0 200 120"
                        className="relative h-20 w-full"
                        fill="none"
                        aria-hidden
                      >
                        <motion.path
                          d={ECG}
                          stroke="#5aa318"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={flat ? undefined : { pathLength: 0, opacity: 0 }}
                          animate={flat ? undefined : { pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.6, ease: "easeInOut" }}
                        />
                      </svg>
                    </div>

                    {/* capability tiles */}
                    <ul
                      className="relative mt-3 grid grid-cols-2 gap-2"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {CAPABILITIES.map((c, i) => (
                        <li
                          key={c.label}
                          className="flex items-center gap-2 rounded-[14px] border border-white/70 bg-white/60 px-3 py-2.5"
                          style={z(28 - i * 3)}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#5aa318]/12 text-[#3f7a0e]">
                            <c.Glyph className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          <span className="text-[0.74rem] font-medium leading-tight text-studio-950">
                            {c.label}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* footer strip — abstract status, no claim data */}
                    <div
                      className="relative mt-3 flex items-center justify-between gap-3 rounded-[14px] bg-white/55 px-3.5 py-2.5"
                      style={z(20)}
                    >
                      <span className="flex items-center gap-2 text-[0.72rem] text-studio-500">
                        <Sparkles className="h-3.5 w-3.5 text-[#159a8c]" aria-hidden />
                        Models active
                      </span>
                      <span className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#3f7a0e]">
                        <Activity className="h-3.5 w-3.5" aria-hidden />
                        Real-time
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============ satellites at their own depths ============ */}
              <Satellite
                className="-left-3 top-6 sm:-left-8 lg:-left-14"
                zdepth={130}
                delay={0}
                flat={flat}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#5aa318] text-white">
                  <Radar className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-[0.78rem] font-semibold text-studio-950">Intelligent</span>
              </Satellite>

              <Satellite
                className="-right-3 top-20 sm:-right-8 lg:-right-12"
                zdepth={100}
                delay={1.4}
                flat={flat}
              >
                <span className="tabular rounded-full bg-[#159a8c]/15 px-2 py-0.5 text-[0.65rem] font-semibold text-[#0f7a6f]">
                  Auto-coded
                </span>
              </Satellite>

              <Satellite
                className="-left-2 bottom-12 sm:-left-6 lg:-left-8"
                zdepth={115}
                delay={2.6}
                flat={flat}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#159a8c]/15 text-[#0f7a6f]">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-[0.75rem] font-medium text-studio-700">Predictive</span>
              </Satellite>

              <Satellite
                className="-right-2 -bottom-2 sm:-right-4 lg:-right-6"
                zdepth={140}
                delay={3.6}
                flat={flat}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-studio-950 text-white">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-[0.75rem] font-medium text-studio-700">Insights</span>
              </Satellite>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* contact shadow — grounds the object in the light */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-[50%] bg-studio-950/12 blur-xl"
        animate={flat ? undefined : { scaleX: [1, 1.07, 1], opacity: [0.75, 0.5, 0.75] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/** A floating chip at its own depth, with its own float timing. */
function Satellite({
  children,
  className = "",
  zdepth,
  delay,
  flat,
}: {
  children: React.ReactNode;
  className?: string;
  zdepth: number;
  delay: number;
  flat: boolean;
}) {
  return (
    <motion.div
      // framer-motion owns `z` so it composes with the animated y
      style={{ z: zdepth, transformStyle: "preserve-3d" }}
      animate={flat ? undefined : { y: [0, -9, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-[0_10px_30px_-12px_rgba(27,42,21,0.35)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
