import { IMPACT } from "../../data/content";
import { Kicker } from "../ui";

/** Chart data — exact values from the brief, no modifications. */
type ChartData = {
  title: string;
  unit: string;
  before: number;
  after: number;
  improvement: string;
  beforeLabel: string;
  afterLabel: string;
  scaleMax: number;
  scaleLabel: string;
};

/** Calculated bar height percentage based on value / scaleMax. */
function barHeight(value: number, scaleMax: number): number {
  if (scaleMax <= 0) return 0;
  const h = (value / scaleMax) * 100;
  return Math.max(20, Math.round(h));
}

/** Render one impact chart card with vertical bar graph. */
function ChartCard({ data }: { data: ChartData }) {
  const beforeHeight = barHeight(data.before, data.scaleMax);
  const afterHeight = barHeight(data.after, data.scaleMax);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-ink-100 hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-ink-900 tracking-wider">{data.title}</h3>
        <p className="text-xs text-ink-500 mt-1">{data.unit}</p>
      </div>

      {/* Baseline + bars */}
      <div className="relative h-80 mb-4">
        {/* Baseline */}
        <svg viewBox="0 0 240 360" className="w-full h-full" role="img" aria-hidden>
          <defs>
            <linearGradient id="beforeGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#17c1bb" />
              <stop offset="100%" stopColor="#0fa3a0" />
            </linearGradient>
            <linearGradient id="afterGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Gridlines */}
          <g stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4">
            {[25, 50, 75, 100].map((pct) => (
              <line
                key={pct}
                x1={20}
                y1={360 - (pct / 100) * 340}
                x2={220}
                y2={360 - (pct / 100) * 340}
              />
            ))}
          </g>

          {/* Y-axis labels */}
          <g fontSize="11" fill="#94a3b8" fontFamily="Inter, sans-serif" textAnchor="end">
            {[0, 25, 50, 75, 100].map((pct) => (
              <text
                key={pct}
                x={15}
                y={360 - (pct / 100) * 340 + 4}
                dominantBaseline="middle"
              >
                {Math.round((pct / 100) * data.scaleMax)}
              </text>
            ))}
          </g>

          {/* Before bar - electric blue */}
          <rect
            x={60}
            y={360 - beforeHeight * 3.4}
            width={70}
            height={beforeHeight * 3.4}
            rx={8}
            fill="url(#beforeGrad)"
            className="bar-animate"
            style={{ animationDelay: "0ms" }}
          />
          {/* Before value label */}
          <text
            x={95}
            y={360 - beforeHeight * 3.4 - 10}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="#1e293b"
            fontFamily="Inter, sans-serif"
            className="label-animate"
            style={{ animationDelay: "150ms" }}
          >
            {data.beforeLabel}
          </text>

          {/* After bar - fresh green */}
          <rect
            x={150}
            y={360 - afterHeight * 3.4}
            width={70}
            height={afterHeight * 3.4}
            rx={8}
            fill="url(#afterGrad)"
            className="bar-animate"
            style={{ animationDelay: "200ms" }}
          />
          {/* After value label */}
          <text
            x={185}
            y={360 - afterHeight * 3.4 - 10}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="#1e293b"
            fontFamily="Inter, sans-serif"
            className="label-animate"
            style={{ animationDelay: "350ms" }}
          >
            {data.afterLabel}
          </text>

          {/* X-axis labels */}
          <g fontSize="12" fill="#475569" fontFamily="Inter, sans-serif" fontWeight="500" textAnchor="middle">
            <text x={95} y={375}>Before HRCM</text>
            <text x={185} y={375}>After HRCM</text>
          </g>
        </svg>
      </div>

      {/* Improvement summary */}
      <div className="flex items-center justify-between pt-3 border-t border-ink-100">
        <span className="text-sm font-semibold text-green-700 flex items-center gap-1">
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5l-5 5 5 5" />
          </svg>
          {data.improvement}
        </span>
      </div>
    </div>
  );
}

const CHARTS = [
  {
    title: "Payment Turnaround",
    unit: "Days",
    before: 120,
    after: 60,
    improvement: "96% Faster",
    beforeLabel: "120",
    afterLabel: "60",
    scaleMax: 120,
    scaleLabel: "Days",
  },
  {
    title: "Deduction Percentage",
    unit: "%",
    before: 23.5,
    after: 2.1,
    improvement: "91% Reduction",
    beforeLabel: "23.5",
    afterLabel: "2.1",
    scaleMax: 40,
    scaleLabel: "%",
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
    scaleLabel: "₹ Cr",
  },
  {
    title: "Denial Rate",
    unit: "%",
    before: 12.8,
    after: 2.3,
    improvement: "82% Reduction",
    beforeLabel: "12.8",
    afterLabel: "2.3",
    scaleMax: 15,
    scaleLabel: "%",
  },
];

export function Impact() {
  return (
    <section
      id="impact"
      className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50 min-h-fit"
    >
      <style>
        {`
          .bar-animate {
            animation: barGrow 1s ease-out forwards;
            transform-origin: bottom;
            transform: scaleY(0);
          }
          .label-animate {
            animation: fadeIn 0.5s ease-out forwards;
            opacity: 0;
          }
          @keyframes barGrow {
            from { transform: scaleY(0); }
            to { transform: scaleY(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div className="relative mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-16">
        {/* Introduction column — desktop left, mobile stacked */}
        <div className="sm:w-1/2 max-w-3xl lg:pr-10">
          <Kicker tone="sprout">BUSINESS IMPACT</Kicker>
          <h2 className="mt-3 text-[2.25rem] sm:text-[2.75rem] font-bold leading-[1.05] tracking-[-0.02em] text-ink-900">
            Business Impact
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-600 max-w-xl">
            {IMPACT.intro}
          </p>
        </div>

        {/* Charts container — spaced out on viewport */}
        <div className="sm:w-1/2 sm:mt-0 lg:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {CHARTS.map((chart) => (
              <div key={chart.title} className="relative">
                <ChartCard data={chart} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}