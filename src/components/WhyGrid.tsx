import type { Ref } from "react";
import { motion } from "framer-motion";
import { WHY } from "../data/content";
import { IconTile } from "./ui";
import { Brain, Cpu, Eye, Gauge, Layers, ShieldCheck, Users } from "lucide-react";

const ICONS: Record<string, typeof Users> = {
  "Unified Private & Government Panel Coverage": Layers,
  "AI-Driven Scrutiny for Indian Healthcare": Brain,
  "Multi-Stage Audit Checkpoints & Loops": ShieldCheck,
  "Strict TAT Tracking with Escalation Matrix": Gauge,
  "API-Enabled HIS & Built-In OCR Automation": Cpu,
  "Modular Deployment & Full Audit Transparency": Eye,
};

const TONES: Record<string, "azure" | "aqua" | "orchid" | "signal"> = {
  "Unified Private & Government Panel Coverage": "azure",
  "AI-Driven Scrutiny for Indian Healthcare": "orchid",
  "Multi-Stage Audit Checkpoints & Loops": "signal",
  "Strict TAT Tracking with Escalation Matrix": "aqua",
  "API-Enabled HIS & Built-In OCR Automation": "azure",
  "Modular Deployment & Full Audit Transparency": "signal",
};

/**
 * The "Why Choose HRCM" feature grid (icon tile + title + text).
 * Six equal tiles in 3 × 2, so every row is full. Shared by WhyHRCM and WhyPage.
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
      className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
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
