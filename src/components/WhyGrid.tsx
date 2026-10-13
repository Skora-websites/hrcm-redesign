import type { Ref } from "react";
import { motion } from "framer-motion";
import { WHY } from "../data/content";
import { IconTile } from "./ui";
import { Brain, Eye, Gauge, Layers, LifeBuoy, Users } from "lucide-react";

const ICONS: Record<string, typeof Users> = {
  "Specialized Expertise": Users,
  "Data-Driven Insights": Brain,
  "Transparent Processes": Eye,
  "Dedicated Support": LifeBuoy,
  "Scalable Solutions": Gauge,
};

const TONES: Record<string, "azure" | "aqua" | "orchid" | "signal"> = {
  "Specialized Expertise": "azure",
  "Data-Driven Insights": "orchid",
  "Transparent Processes": "aqua",
  "Dedicated Support": "signal",
  "Scalable Solutions": "azure",
};

/**
 * The "Why Choose HRCM" feature grid (icon tile + title + text) plus a photo
 * tile that closes the grid. Six tiles in 3 × 2, so every row is full and
 * every card is the same size. Shared by the homepage WhyHRCM section and
 * the Why page.
 */
export function WhyGrid({
  className = "",
  ref,
}: {
  className?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {WHY.items.map((item, i) => {
        const Icon = ICONS[item.title] ?? Users;
        const tone = TONES[item.title] ?? "azure";
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group bento-item h-full min-h-[19rem] p-6"
          >
            <span className="pointer-events-none absolute inset-0 rounded-[var(--r-bento)] bg-gradient-to-br from-azure-100/0 to-aqua-100/0 opacity-0 transition-opacity duration-500 group-hover:from-azure-100/40 group-hover:to-aqua-100/25 group-hover:opacity-100" />
            <div className="relative flex h-full flex-col">
              <IconTile size="lg" variant="clay" tone={tone}>
                <Icon aria-hidden />
              </IconTile>
              <h3 className="mt-4 text-[1.1rem] font-semibold tracking-[-0.015em] text-ink-900">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">{item.text}</p>
            </div>
          </motion.div>
        );
      })}

      {/* Sixth tile — same card design as the other five, closing the grid */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="group bento-item h-full min-h-[19rem] p-6"
      >
        <span className="pointer-events-none absolute inset-0 rounded-[var(--r-bento)] bg-gradient-to-br from-azure-100/0 to-aqua-100/0 opacity-0 transition-opacity duration-500 group-hover:from-azure-100/40 group-hover:to-aqua-100/25 group-hover:opacity-100" />
        <div className="relative flex h-full flex-col">
          <IconTile size="lg" variant="clay" tone="aqua">
            <Layers aria-hidden />
          </IconTile>
          <h3 className="mt-4 text-[1.1rem] font-semibold tracking-[-0.015em] text-ink-900">
            End-to-end accountability
          </h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">
            Claims audit, submission, accounts receivable, reconciliation and billing handled by a
            single accountable team.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
