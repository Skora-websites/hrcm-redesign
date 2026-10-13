import { useRef, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Check, Undo2 } from "lucide-react";

/**
 * HeroObject — the hero's centrepiece.
 *
 * A translucent glass claim sheet with real claim rows sitting at different
 * depths inside it, and satellite chips floating around it at their own
 * focal distances. Built with real 3D transforms, not an illustration:
 *
 *   group 1 — the scroll tumble (rotateX + y + scale as the hero leaves)
 *   group 2 — the pointer tilt (springs, ±16° / ±12°)
 *   group 3 — a continuous showcase turn, so the object never sits still
 *
 * Pointer tilt composes with the showcase turn instead of fighting it.
 * Every inner layer carries its own translateZ, so tilting produces real
 * parallax. The glass is warm (peach/violet/rose) to sit in the pastel
 * studio, and far satellites are blurred for depth-of-field.
 *
 * Inert under prefers-reduced-motion: flat, no tilt, no turn.
 */

const EASE_SPRING = { stiffness: 120, damping: 18, mass: 0.7 };

/** Claim rows shown inside the sheet. */
const ROWS = [
  { id: "CL-4821", payer: "Star Health", amount: "₹1,84,500", status: "settled" as const },
  { id: "CL-4827", payer: "New India", amount: "₹92,300", status: "denied" as const },
  { id: "CL-4833", payer: "HDFC Ergo", amount: "₹3,41,000", status: "review" as const },
  { id: "CL-4841", payer: "ICICI Lombard", amount: "₹2,26,750", status: "settled" as const },
];

/** Status chips — violet for the good outcome, keeping the accent single. */
const CHIP: Record<string, string> = {
  settled: "border-[#9f69c5]/25 bg-[#9f69c5]/12 text-[#7d4ea0]",
  review: "border-studio-500/25 bg-studio-500/12 text-studio-700",
  denied: "border-alert-200 bg-alert-50 text-alert-600",
};

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
            animate={flat ? undefined : { rotateY: [-24, 24, -24] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* ============ the glass claim sheet ============ */}
            <div className="relative" style={{ transformStyle: "preserve-3d" }}>
              {/* coloured refraction inside the glass */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 rounded-[44px] opacity-70 blur-xl"
                style={{
                  ...z(-60),
                  background:
                    "radial-gradient(60% 60% at 20% 20%, rgba(246,233,226,0.6), transparent 70%), radial-gradient(50% 50% at 85% 30%, rgba(159,105,197,0.3), transparent 70%), radial-gradient(60% 60% at 60% 95%, rgba(204,182,184,0.42), transparent 70%)",
                }}
              />

              {/* glass body — the rim gradient stands in for the glass edge */}
              <div
                className="relative rounded-[38px] p-[1.5px]"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(255,255,255,0.98) 0%, rgba(246,233,226,0.6) 34%, rgba(215,193,189,0.38) 56%, rgba(255,255,255,0.75) 100%)",
                  boxShadow:
                    "0 2px 6px rgba(30,26,40,0.05), 0 30px 70px -28px rgba(30,26,40,0.4), 0 70px 130px -60px rgba(159,105,197,0.35)",
                }}
              >
                <div
                  className="relative overflow-hidden rounded-[37px] p-5 sm:p-6"
                  style={{
                    // No backdrop-filter here: a filtered element flattens its
                    // subtree, which would destroy the internal Z-depth. The
                    // layered gradients + specular carry the glass read instead.
                    background:
                      "linear-gradient(150deg, rgba(255,255,255,0.9) 0%, rgba(246,233,226,0.74) 45%, rgba(236,214,205,0.8) 100%)",
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
                    {/* deep watermark */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-3 -top-4 select-none text-[6rem] font-bold leading-none text-studio-950/10"
                      style={z(-10)}
                    >
                      ₹
                    </div>

                    {/* header */}
                    <div className="relative flex items-center justify-between gap-3" style={z(46)}>
                      <span className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9f69c5] opacity-70" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9f69c5]" />
                        </span>
                        <span className="text-[0.9rem] font-semibold text-studio-950">
                          Claims board
                        </span>
                      </span>
                      <span className="tabular rounded-full border border-white/70 bg-white/70 px-2.5 py-0.5 text-[0.7rem] font-medium text-studio-700">
                        Today · 4 of 128
                      </span>
                    </div>

                    {/* rows — each row sits a little less deep than the last */}
                    <ul className="relative mt-4 space-y-2" style={{ transformStyle: "preserve-3d" }}>
                      {ROWS.map((r, i) => (
                        <li
                          key={r.id}
                          className="flex items-center gap-3 rounded-[14px] border border-white/70 bg-white/60 px-3 py-2.5"
                          style={z(34 - i * 4)}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="tabular block text-[0.8rem] font-semibold text-studio-950">
                              {r.id}
                            </span>
                            <span className="mt-0.5 block truncate text-[0.72rem] text-studio-500">
                              {r.payer}
                            </span>
                          </span>
                          <span className="tabular text-[0.78rem] font-medium text-studio-950">
                            {r.amount}
                          </span>
                          <span className={`status-chip text-[0.62rem] ${CHIP[r.status]}`}>
                            {r.status === "settled"
                              ? "Settled"
                              : r.status === "denied"
                                ? "Denied"
                                : "In review"}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* footer strip */}
                    <div
                      className="relative mt-4 flex items-center justify-between gap-3 rounded-[14px] bg-white/55 px-3.5 py-2.5"
                      style={z(22)}
                    >
                      <span className="text-[0.72rem] text-studio-500">Recovered this month</span>
                      <span className="tabular text-[0.95rem] font-semibold text-studio-950">
                        ₹38.4 L
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
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#9f69c5] text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-[0.78rem] font-semibold text-studio-950">Settled</span>
              </Satellite>

              {/* far of focus */}
              <Satellite
                className="-right-3 top-20 sm:-right-8 lg:-right-12"
                zdepth={100}
                delay={1.4}
                flat={flat}
              >
                <span className="tabular text-[0.78rem] font-semibold text-studio-950">₹4.2 L</span>
                <span className="tabular rounded-full bg-[#9f69c5]/15 px-2 py-0.5 text-[0.65rem] font-semibold text-[#7d4ea0]">
                  recovered
                </span>
              </Satellite>

              {/* far of focus */}
              <Satellite
                className="-left-2 bottom-12 sm:-left-6 lg:-left-8"
                zdepth={115}
                delay={2.6}
                flat={flat}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-alert-100 text-alert-600">
                  <Undo2 className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-[0.75rem] font-medium text-studio-700">Re-billing</span>
              </Satellite>

              <Satellite
                className="-right-2 -bottom-2 sm:-right-4 lg:-right-6"
                zdepth={140}
                delay={3.6}
                flat={flat}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-studio-950 text-white">
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-[0.75rem] font-medium text-studio-700">Audit</span>
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
      className={`absolute flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-[0_10px_30px_-12px_rgba(30,26,40,0.35)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
