import type { Ref } from "react";
import { motion } from "framer-motion";
import { IMPACT } from "../data/content";
import { IconTile } from "./ui";
import {
  Banknote,
  Eye,
  HandCoins,
  ShieldCheck,
  Timer,
} from "lucide-react";

const ICONS: Record<string, typeof Timer> = {
  "Faster Payment": Timer,
  "Denial Claims": ShieldCheck,
  "Improved Revenue": Banknote,
  "Payment Collection": HandCoins,
  "Greater Financial Visibility": Eye,
};

const TONES: Record<string, "azure" | "aqua" | "orchid" | "signal"> = {
  "Faster Payment": "azure",
  "Denial Claims": "signal",
  "Improved Revenue": "orchid",
  "Payment Collection": "aqua",
  "Greater Financial Visibility": "azure",
};

/**
 * The five Business Impact benefit cards (icon + title + text) plus a photo
 * tile that closes the grid — six equal tiles in 3 × 2, so no row is ever
 * left short. Shared by the homepage Impact section, the About page and the
 * Why page.
 */
export function ImpactCards({
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
      {IMPACT.cards.map((c, i) => {
        const Icon = ICONS[c.title] ?? ShieldCheck;
        const tone = TONES[c.title] ?? "azure";
        return (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group bento-item h-full min-h-[16rem] p-6"
          >
            <IconTile size="lg" variant="clay" tone={tone}>
              <Icon aria-hidden />
            </IconTile>
            <h3 className="mt-4 text-[1.05rem] font-semibold tracking-[-0.01em] text-ink-900">
              {c.title}
            </h3>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-600">{c.text}</p>
          </motion.div>
        );
      })}

      {/* Sixth tile — same card design as the other five, closing the grid */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="group bento-item h-full min-h-[16rem] p-6"
      >
        <IconTile size="lg" variant="clay" tone="azure">
          <Timer aria-hidden />
        </IconTile>
        <h3 className="mt-4 text-[1.05rem] font-semibold tracking-[-0.01em] text-ink-900">
          Faster payment cycles
        </h3>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-600">
          Days of payment turnaround reduced from 120 to 60 across recent engagements.
        </p>
      </motion.div>
    </div>
  );
}
