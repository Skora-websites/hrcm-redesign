import { useEffect, useRef, useState } from "react";
import { IMPACT } from "../../data/content";
import { Kicker } from "../ui";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ChartData = {
  title: string;
  unit: string;
  before: number;
  after: number;
  improvement: string;
  beforeLabel: string;
  afterLabel: string;
  scaleMax: number;
  scaleSteps: number[]; // 4 tick values for the Y axis
  accent: {
    top: string;         // Specular highlight on top face
    leftStart: string;   // Key light front-left face start
    leftEnd: string;     // Key light front-left face end
    rightStart: string;  // Ambient shadow front-right face start
    rightEnd: string;    // Ambient shadow front-right face end
    pin: string;         // Success marker pin badge & needle
    glow: string;        // Ambient halo
    badgeBg: string;     // Pill background
    badgeText: string;   // Pill text
  };
};

/* ------------------------------------------------------------------ */
/*  Spring Progress Hook                                               */
/*  Maintains true mathematical 3D geometry during animation           */
/* ------------------------------------------------------------------ */

function useSpringProgress(active: boolean, delay = 0, duration = 1000): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      return;
    }
    let animId: number;
    let startTime: number | null = null;

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(1, elapsed / duration);

        // Overshoot spring: reaches ~1.04 then settles cleanly to 1.0
        const p = 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
        setProgress(Math.max(0, p));

        if (t < 1) {
          animId = requestAnimationFrame(step);
        } else {
          setProgress(1);
        }
      };
      animId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
    };
  }, [active, delay, duration]);

  return progress;
}

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */

function AnimatedValue({
  target,
  progress,
  run,
}: {
  target: string;
  progress: number;
  run: boolean;
}) {
  if (!run || progress === 0) return <>0</>;
  const num = parseFloat(target);
  const isDec = target.includes(".");
  const current = num * Math.min(1, progress);
  return <>{isDec ? current.toFixed(1) : Math.round(current).toString()}</>;
}

/* ------------------------------------------------------------------ */
/*  3D Isometric Clay Pillar & "Success Point" Pin                     */
/* ------------------------------------------------------------------ */

interface PillarProps {
  uid: string;
  cx: number;
  baseY: number;
  hw: number;       // Half-width
  pitch: number;    // Vertical isometric angle pitch
  targetH: number;  // Full height
  progress: number;
  topColor: string;
  leftGradId: string;
  rightGradId: string;
  pinColor: string;
  pinLabel: string;
  unit: string;
  run: boolean;
  glowColor?: string;
  isAccent?: boolean;
}

function IsometricClayPillar({
  uid,
  cx,
  baseY,
  hw,
  pitch,
  targetH,
  progress,
  topColor,
  leftGradId,
  rightGradId,
  pinColor,
  pinLabel,
  unit,
  run,
  glowColor,
  isAccent = false,
}: PillarProps) {
  // Height calculated mathematically at every frame
  const currentH = Math.max(2, targetH * progress);
  const topY = baseY - currentH;

  // Vertices of the top diamond face
  const topV = { x: cx, y: topY - pitch };
  const rightV = { x: cx + hw, y: topY };
  const bottomV = { x: cx, y: topY + pitch };
  const leftV = { x: cx - hw, y: topY };

  // Vertices of the base diamond
  const baseRightV = { x: cx + hw, y: baseY };
  const baseBottomV = { x: cx, y: baseY + pitch };
  const baseLeftV = { x: cx - hw, y: baseY };

  // Reference "Success Point" Pin dimensions
  const pinH = 25;
  const pinW = 52;
  const needleH = 18;
  const needleW = 7;
  const pinCenterY = topY - needleH - pinH / 2;
  const pinBoxY = topY - needleH - pinH;

  return (
    <g>
      {/* ── Soft Clay Ambient Ground Shadow ── */}
      <ellipse
        cx={cx}
        cy={baseY + pitch + 2}
        rx={hw * 1.35}
        ry={pitch * 0.85}
        fill="rgba(15, 23, 42, 0.14)"
        filter={`url(#${uid}-ground-shadow)`}
      />

      {/* ── Subtle Ambient Halo for Accent Pillar ── */}
      {isAccent && glowColor && (
        <ellipse
          cx={cx}
          cy={topY + currentH / 2}
          rx={hw * 1.5}
          ry={currentH * 0.65}
          fill={glowColor}
          filter={`url(#${uid}-accent-halo)`}
          opacity={0.3}
        />
      )}

      {/* ── Left Face (Key Light: illuminated side) ── */}
      <polygon
        points={`
          ${leftV.x},${leftV.y}
          ${bottomV.x},${bottomV.y}
          ${baseBottomV.x},${baseBottomV.y}
          ${baseLeftV.x},${baseLeftV.y}
        `}
        fill={`url(#${leftGradId})`}
      />

      {/* ── Right Face (Ambient Shadow: 3D depth side) ── */}
      <polygon
        points={`
          ${bottomV.x},${bottomV.y}
          ${rightV.x},${rightV.y}
          ${baseRightV.x},${baseRightV.y}
          ${baseBottomV.x},${baseBottomV.y}
        `}
        fill={`url(#${rightGradId})`}
      />

      {/* ── Beveled Center Front Seam Highlight ── */}
      <line
        x1={bottomV.x}
        y1={bottomV.y}
        x2={baseBottomV.x}
        y2={baseBottomV.y}
        stroke="rgba(255, 255, 255, 0.55)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* ── Left Ridge Bevel ── */}
      <line
        x1={leftV.x}
        y1={leftV.y}
        x2={baseLeftV.x}
        y2={baseLeftV.y}
        stroke="rgba(255, 255, 255, 0.22)"
        strokeWidth="1"
      />

      {/* ── Top Face (Specular Highlight Diamond) ── */}
      <polygon
        points={`
          ${topV.x},${topV.y}
          ${rightV.x},${rightV.y}
          ${bottomV.x},${bottomV.y}
          ${leftV.x},${leftV.y}
        `}
        fill={topColor}
        filter={`url(#${uid}-clay-depth)`}
      />

      {/* Top face inner light sheen */}
      <polygon
        points={`
          ${topV.x},${topV.y + 1.2}
          ${rightV.x - 1.5},${rightV.y + 0.4}
          ${bottomV.x},${bottomV.y - 1}
          ${leftV.x + 1.5},${leftV.y + 0.4}
        `}
        fill="rgba(255, 255, 255, 0.35)"
      />

      {/* ── Reference "Success Point" Pin (Tapered Needle & Callout Badge) ── */}
      {progress > 0.25 && (
        <g
          style={{
            opacity: Math.min(1, (progress - 0.25) / 0.35),
            transform: `translateY(${(1 - Math.min(1, (progress - 0.25) / 0.75)) * -14}px)`,
            transformOrigin: `${cx}px ${topY}px`,
            transition: "opacity 0.2s ease-out",
          }}
        >
          {/* Tapered needle pointer planted in top center (cx, topY) */}
          <polygon
            points={`
              ${cx - needleW / 2},${pinBoxY + pinH}
              ${cx + needleW / 2},${pinBoxY + pinH}
              ${cx},${topY}
            `}
            fill={pinColor}
          />

          {/* Anchor socket ring where needle meets top face */}
          <circle
            cx={cx}
            cy={topY}
            r={2.2}
            fill="#ffffff"
            stroke={pinColor}
            strokeWidth="1.2"
          />

          {/* Callout Badge Box */}
          <rect
            x={cx - pinW / 2}
            y={pinBoxY}
            width={pinW}
            height={pinH}
            rx={6}
            fill={pinColor}
            filter={`url(#${uid}-pin-shadow)`}
          />

          {/* Top highlight line inside badge */}
          <rect
            x={cx - pinW / 2 + 2}
            y={pinBoxY + 1.5}
            width={pinW - 4}
            height={6.5}
            rx={3}
            fill="rgba(255, 255, 255, 0.32)"
          />

          {/* Value text inside callout badge */}
          <text
            x={cx}
            y={pinCenterY + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="11"
            fontWeight="700"
            fill="#ffffff"
            fontFamily="var(--font-sans)"
            style={{ letterSpacing: "-0.01em" }}
          >
            <AnimatedValue target={pinLabel} progress={progress} run={run} />
            {unit === "%" ? "%" : ""}
          </text>
        </g>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  ChartCard with 3D Coordinate Reference Frame                      */
/* ------------------------------------------------------------------ */

function ChartCard({
  data,
  index,
  visible,
}: {
  data: ChartData;
  index: number;
  visible: boolean;
}) {
  const uid = `frame-3d-${index}`;
  const baseY = 212;
  const maxBarH = 135;
  const hw = 19;     // Sleek 38px width
  const pitch = 10;  // True 30° isometric pitch

  // Normalize target heights
  const beforeTargetH = Math.max(18, Math.round((data.before / data.scaleMax) * maxBarH));
  const afterTargetH = Math.max(18, Math.round((data.after / data.scaleMax) * maxBarH));

  // Staggered spring animations
  const cardDelay = index * 90;
  const beforeProgress = useSpringProgress(visible, cardDelay + 120, 950);
  const afterProgress = useSpringProgress(visible, cardDelay + 260, 1000);

  const cxBefore = 102;
  const cxAfter = 200;

  // 3D Reference Frame Geometry
  const frameOriginX = 44;
  const frameEndX = 268;
  const frameTopY = baseY - maxBarH - 8;
  const depthDx = -12;
  const depthDy = 14;

  return (
    <div
      className="impact-glass-card group relative flex flex-col justify-between"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        borderRadius: "24px",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${cardDelay}ms, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${cardDelay}ms, box-shadow 0.35s ease`,
      }}
    >
      {/* Top liquid glass refraction edge */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none rounded-t-[24px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 4%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.5) 70%, transparent 96%)",
        }}
      />

      <div className="relative p-5 lg:p-6 flex flex-col h-full">
        {/* ── Card Header ── */}
        <div className="mb-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
              style={{
                background: data.accent.pin,
                boxShadow: `0 0 10px ${data.accent.glow}`,
              }}
            />
            <h3 className="text-sm lg:text-[0.92rem] font-semibold text-ink-900 tracking-tight leading-snug font-sans">
              {data.title}
            </h3>
          </div>
          <p className="text-[0.7rem] text-ink-400 font-medium font-body ml-[18px]">
            Measured in {data.unit}
          </p>
        </div>

        {/* ── 3D Scene SVG Stage ── */}
        <div className="relative w-full aspect-[4/3] my-1 flex items-center justify-center">
          <svg
            viewBox="0 0 290 262"
            className="w-full h-full overflow-visible"
            role="img"
            aria-label={`${data.title} 3D comparison`}
          >
            <defs>
              {/* Neutral Before Pillar Gradients */}
              <linearGradient id={`${uid}-neutral-left`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id={`${uid}-neutral-right`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>

              {/* Accent After Pillar Gradients */}
              <linearGradient id={`${uid}-accent-left`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={data.accent.leftStart} />
                <stop offset="100%" stopColor={data.accent.leftEnd} />
              </linearGradient>
              <linearGradient id={`${uid}-accent-right`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={data.accent.rightStart} />
                <stop offset="100%" stopColor={data.accent.rightEnd} />
              </linearGradient>

              {/* Ground Shadow Filter */}
              <filter id={`${uid}-ground-shadow`} x="-30%" y="-40%" width="160%" height="180%">
                <feGaussianBlur stdDeviation="3" />
              </filter>

              {/* Pin Callout Drop Shadow */}
              <filter id={`${uid}-pin-shadow`} x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.18" />
              </filter>

              {/* Accent Halo Filter */}
              <filter id={`${uid}-accent-halo`} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="12" />
              </filter>

              {/* Top Diamond Depth Filter */}
              <filter id={`${uid}-clay-depth`} x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="1.2" stdDeviation="1" floodColor="#0f172a" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* ======================================================= */}
            {/* ── 3D REFERENCE FRAME (COORDINATE SYSTEM)               */}
            {/* ======================================================= */}
            <g className="reference-frame">
              {/* 1. Back Wall Plane Gridlines */}
              {data.scaleSteps.map((val, idx) => {
                const ratio = val / data.scaleMax;
                const lineY = baseY - ratio * maxBarH;
                const chevronY = lineY;

                return (
                  <g key={val} opacity={0.88}>
                    {/* Horizontal Back-Wall Reference Line */}
                    <line
                      x1={frameOriginX}
                      y1={lineY}
                      x2={frameEndX}
                      y2={lineY}
                      stroke="#e2e8f0"
                      strokeWidth="0.8"
                      strokeDasharray="4 3"
                    />

                    {/* Reference Image Chevron Tag on Left Axis [ 1 > ] */}
                    <polygon
                      points={`
                        10,${chevronY - 7}
                        26,${chevronY - 7}
                        32,${chevronY}
                        26,${chevronY + 7}
                        10,${chevronY + 7}
                      `}
                      fill={idx === 3 ? data.accent.pin : idx === 2 ? "#64748b" : "#94a3b8"}
                      opacity={0.85}
                    />
                    <text
                      x={19}
                      y={chevronY + 0.5}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="7.5"
                      fontWeight="700"
                      fill="#ffffff"
                      fontFamily="var(--font-sans)"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* 2. Vertical Y-Axis (Coordinate Height Axis) */}
              <line
                x1={frameOriginX}
                y1={baseY}
                x2={frameOriginX}
                y2={frameTopY}
                stroke="#cbd5e1"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Y-Axis Arrow Pointer */}
              <polygon
                points={`
                  ${frameOriginX - 3},${frameTopY + 4}
                  ${frameOriginX + 3},${frameTopY + 4}
                  ${frameOriginX},${frameTopY}
                `}
                fill="#94a3b8"
              />

              {/* 3. 3D Ground Floor Coordinate Frame (X & Depth axes) */}
              {/* Back baseline */}
              <line
                x1={frameOriginX}
                y1={baseY}
                x2={frameEndX}
                y2={baseY}
                stroke="#cbd5e1"
                strokeWidth="1.2"
              />
              {/* Left depth coordinate axis receding forward */}
              <line
                x1={frameOriginX}
                y1={baseY}
                x2={frameOriginX + depthDx}
                y2={baseY + depthDy}
                stroke="#cbd5e1"
                strokeWidth="1.2"
              />
              {/* Right depth coordinate axis */}
              <line
                x1={frameEndX}
                y1={baseY}
                x2={frameEndX + depthDx}
                y2={baseY + depthDy}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              {/* Front coordinate baseline */}
              <line
                x1={frameOriginX + depthDx}
                y1={baseY + depthDy}
                x2={frameEndX + depthDx}
                y2={baseY + depthDy}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4 3"
              />

              {/* Subtle 3D Coordinate Footprints underneath each column */}
              {/* Before Column Footprint */}
              <polygon
                points={`
                  ${cxBefore},${baseY - pitch}
                  ${cxBefore + hw},${baseY}
                  ${cxBefore},${baseY + pitch}
                  ${cxBefore - hw},${baseY}
                `}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              {/* After Column Footprint */}
              <polygon
                points={`
                  ${cxAfter},${baseY - pitch}
                  ${cxAfter + hw},${baseY}
                  ${cxAfter},${baseY + pitch}
                  ${cxAfter - hw},${baseY}
                `}
                fill="none"
                stroke={data.accent.pin}
                strokeWidth="0.8"
                strokeDasharray="2 2"
                opacity={0.4}
              />

              {/* Vertical Guide Wire behind each column */}
              <line
                x1={cxBefore}
                y1={frameTopY + 4}
                x2={cxBefore}
                y2={baseY}
                stroke="#f1f5f9"
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />
              <line
                x1={cxAfter}
                y1={frameTopY + 4}
                x2={cxAfter}
                y2={baseY}
                stroke="#f1f5f9"
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />
            </g>

            {/* ======================================================= */}
            {/* ── 3D ISOMETRIC COLUMNS                                 */}
            {/* ======================================================= */}

            {/* Before Column (Neutral Slate Clay) */}
            <IsometricClayPillar
              uid={uid}
              cx={cxBefore}
              baseY={baseY}
              hw={hw}
              pitch={pitch}
              targetH={beforeTargetH}
              progress={beforeProgress}
              topColor="#f8fafc"
              leftGradId={`${uid}-neutral-left`}
              rightGradId={`${uid}-neutral-right`}
              pinColor="#475467"
              pinLabel={data.beforeLabel}
              unit={data.unit}
              run={visible}
            />

            {/* After Column (Vibrant Brand Clay) */}
            <IsometricClayPillar
              uid={uid}
              cx={cxAfter}
              baseY={baseY}
              hw={hw}
              pitch={pitch}
              targetH={afterTargetH}
              progress={afterProgress}
              topColor={data.accent.top}
              leftGradId={`${uid}-accent-left`}
              rightGradId={`${uid}-accent-right`}
              pinColor={data.accent.pin}
              pinLabel={data.afterLabel}
              unit={data.unit}
              run={visible}
              glowColor={data.accent.glow}
              isAccent
            />

            {/* ── X-Axis Pillar Base Labels ── */}
            <g
              fontSize="10"
              fontFamily="var(--font-sans)"
              fontWeight="600"
              textAnchor="middle"
            >
              <text x={cxBefore} y={baseY + depthDy + 16} fill="#64748b">
                Before
              </text>
              <text x={cxAfter} y={baseY + depthDy + 16} fill={data.accent.pin}>
                After HRCM
              </text>
            </g>
          </svg>
        </div>

        {/* ── Card Footer: Improvement Badge ── */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-sans transition-transform duration-200 group-hover:scale-105"
            style={{
              background: data.accent.badgeBg,
              color: data.accent.badgeText,
              border: `1px solid ${data.accent.pin}25`,
            }}
          >
            <svg
              viewBox="0 0 16 16"
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 12V4M4 8l4-4 4 4" />
            </svg>
            <span>{data.improvement}</span>
          </div>

          <span className="text-[0.68rem] font-medium text-ink-400 font-sans">
            vs Industry Standard
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dataset: 4 Metrics with Precision Brand Colors                    */
/* ------------------------------------------------------------------ */

const METRICS: ChartData[] = [
  {
    title: "Payment Turnaround",
    unit: "Days",
    before: 120,
    after: 60,
    improvement: "96% Faster",
    beforeLabel: "120",
    afterLabel: "60",
    scaleMax: 120,
    scaleSteps: [30, 60, 90, 120],
    accent: {
      top: "#74b6fa",
      leftStart: "#258bf7",
      leftEnd: "#0071e3",
      rightStart: "#005bb5",
      rightEnd: "#003f7e",
      pin: "#0071e3",
      glow: "rgba(0, 113, 227, 0.45)",
      badgeBg: "#eef6ff",
      badgeText: "#0071e3",
    },
  },
  {
    title: "Deduction Rate",
    unit: "%",
    before: 23.5,
    after: 2.1,
    improvement: "91% Reduction",
    beforeLabel: "23.5",
    afterLabel: "2.1",
    scaleMax: 30,
    scaleSteps: [8, 15, 23, 30],
    accent: {
      top: "#8ee559",
      leftStart: "#62be28",
      leftEnd: "#4fa81a",
      rightStart: "#398011",
      rightEnd: "#235408",
      pin: "#4fa81a",
      glow: "rgba(79, 168, 26, 0.45)",
      badgeBg: "#f2faec",
      badgeText: "#3c8812",
    },
  },
  {
    title: "Unsettled Balances",
    unit: "₹ Cr",
    before: 92,
    after: 8,
    improvement: "84% Reduction",
    beforeLabel: "92",
    afterLabel: "8",
    scaleMax: 100,
    scaleSteps: [25, 50, 75, 100],
    accent: {
      top: "#67e2df",
      leftStart: "#1fc5c1",
      leftEnd: "#0fa3a0",
      rightStart: "#0a7775",
      rightEnd: "#064b49",
      pin: "#0fa3a0",
      glow: "rgba(15, 163, 160, 0.45)",
      badgeBg: "#edfbfb",
      badgeText: "#0d8482",
    },
  },
  {
    title: "Claim Denial Rate",
    unit: "%",
    before: 12.8,
    after: 2.3,
    improvement: "82% Reduction",
    beforeLabel: "12.8",
    afterLabel: "2.3",
    scaleMax: 15,
    scaleSteps: [4, 8, 12, 15],
    accent: {
      top: "#c6abfe",
      leftStart: "#9f76fc",
      leftEnd: "#8b5cf6",
      rightStart: "#693ad4",
      rightEnd: "#48219b",
      pin: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.45)",
      badgeBg: "#f5f0ff",
      badgeText: "#7443eb",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Main Section Component                                             */
/* ------------------------------------------------------------------ */

export function Impact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "var(--color-cloud-100)" }}
    >
      <style>{`
        /* Card interactive hover lift */
        .impact-glass-card {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
        }
        .impact-glass-card:hover {
          box-shadow: var(--glass-shadow-lift) !important;
          transform: translateY(-6px) !important;
        }
      `}</style>

      {/* Atmospheric Ambient Gradients */}
      <div
        className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-azure-100) 0%, transparent 70%)",
          opacity: 0.5,
        }}
      />
      <div
        className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-sprout-100) 0%, transparent 70%)",
          opacity: 0.45,
        }}
      />

      <div className="relative mx-auto max-w-[100rem] px-5 sm:px-8 lg:px-12">
        {/* ── Section Header ── */}
        <div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.75s ease, transform 0.75s ease",
          }}
        >
          <Kicker tone="sprout">BUSINESS IMPACT</Kicker>
          <h2 className="mt-3 text-[2rem] sm:text-[2.75rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink-900 font-display">
            Business Impact
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-500 font-body">
            {IMPACT.intro}
          </p>
        </div>

        {/* ── 4 Cards in 1 Row on Desktop ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {METRICS.map((metric, idx) => (
            <ChartCard
              key={metric.title}
              data={metric}
              index={idx}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}