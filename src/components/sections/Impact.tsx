import { IMPACT } from "../../data/content";
import { Kicker } from "../ui";
import { StaggerContainer, StaggerItem } from "../ui";

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

/** Calculated bar width percentage based on value / scaleMax. */
function barPercent(value: number, scaleMax: number): number {
  if (scaleMax <= 0) return 0;
  const p = (value / scaleMax) * 100;
  return Math.max(6, Math.round(p));
}

/** Render a single data-driven horizontal bar pair SVG. */
function DataBar({
  percent,
  isAfter,
  title,
}: {
  percent: number;
  isAfter: boolean;
  title: string;
}) {
  const fill = isAfter ? "rgba(16, 185, 128, 0.8)" : "rgba(29, 193, 193, 0.8)";
  return (
    <svg
      viewBox="0 0 120 24"
      role="img"
      aria-label={title}
    >
      <rect x={0} y={4} width={percent} height="16" rx="4" fill={fill} />
    </svg>
  );
}

/** Render one chart card with its title, unit, bars, and improvement summary. */
function ChartCard({ data }: { data: ChartData }) {
  const beforePercent = barPercent(data.before, data.scaleMax);
  const afterPercent = barPercent(data.after, data.scaleMax);

  return (
    <section className="p-6 pt-0">
      <h3 className="text-sm font-medium text-ink-900 tracking-wider">{data.title}</h3>
      <p className="text-xs text-ink-600">{data.unit}</p>
      <div className="mt-4 space-y-1">
        <DataBar percent={beforePercent} isAfter={false} title="Before HRCM" />
        <DataBar percent={afterPercent} isAfter={true} title="After HRCM" />
      </div>
      <p className="mt-3 text-sm font-medium text-green-600">
        {data.improvement}
      </p>
    </section>
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
      className="relative overflow-hidden py-12 sm:py-16 bg-white min-h-fit"
    >
      <div className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
        {/* Introduction column — desktop left, mobile stacked */}
        <div className="sm:w-1/2 max-w-3xl">
          <Kicker tone="sprout">BUSINESS IMPACT</Kicker>
          <h2 className="mt-2 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.02em] text-ink-900">
            Business Impact
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            {IMPACT.intro}
          </p>
        </div>

        {/* Charts grid — desktop right, mobile stacked below intro */}
        <div className="sm:w-1/2 sm:mt-0 sm:pr-8">
          <StaggerContainer
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CHARTS.map((chart) => (
              <StaggerItem key={chart.title} className="col-span-1">
                <ChartCard data={chart} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}