import type { Ref } from "react";
import { motion } from "framer-motion";
import { WHY } from "../data/content";
import { IconTile } from "./ui";
import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle2,
  Cpu,
  MessageSquareCheck,
  RotateCcw,
  Send,
  Users,
} from "lucide-react";

const ICONS: Record<string, typeof Users> = {
  "Audit, Dispatch & Multi-Channel Submission": Send,
  "End-to-End Claim Tracking & Recovery": Activity,
  "Specialized Delayed & Rejected Claim Recovery": RotateCcw,
  "Customized MIS & Dashboard Reporting": BarChart3,
  "Complete Claim Query Lifecycle Management": MessageSquareCheck,
  "Comprehensive Payment Reconciliation": CheckCircle2,
  "AI-Driven Scrutiny for Indian Healthcare": Brain,
  "API-Enabled HIS & Built-In Document Automation": Cpu,
};

const TONES: Record<string, "azure" | "aqua" | "orchid" | "signal"> = {
  "Audit, Dispatch & Multi-Channel Submission": "azure",
  "End-to-End Claim Tracking & Recovery": "aqua",
  "Specialized Delayed & Rejected Claim Recovery": "signal",
  "Customized MIS & Dashboard Reporting": "azure",
  "Complete Claim Query Lifecycle Management": "orchid",
  "Comprehensive Payment Reconciliation": "aqua",
  "AI-Driven Scrutiny for Indian Healthcare": "orchid",
  "API-Enabled HIS & Built-In Document Automation": "azure",
};

/**
 * The "Why Choose HRCM" feature grid (icon tile + title + text).
 * Eight equal tiles in 4 × 2 layout. Shared by WhyHRCM and WhyPage.
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
      className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
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
              <h3 className="mt-4 text-[1.12rem] font-semibold tracking-[-0.015em] text-ink-900">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-600">{item.text}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
