import type { Ref } from "react";
import { motion } from "framer-motion";
import { FOUNDERS } from "../data/content";
import { Quote } from "lucide-react";

/** First sentence of the bio for the card summary. */
function summary(bio: string): string {
  const m = bio.match(/^[^.!?]*[.!?]/);
  return (m ? m[0] : bio).trim();
}

/** Years of experience pulled from the bio, e.g. "30+ years". */
function experience(bio: string): string {
  const m = bio.match(/(\d+\+?\s*years)/i);
  return m ? m[1].replace(/\s+/g, " ") : "";
}

/**
 * Founder profile cards (photo, name, role, bio). Shared by the homepage
 * Founders section and the Team page; `heading` controls the heading level
 * to keep each page's outline valid (h3 on the homepage under the section
 * heading, h2 on the standalone Team page).
 */
export function FoundersGrid({
  heading,
  className = "",
  ref,
}: {
  heading: "h2" | "h3";
  className?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  const Heading = heading;
  return (
    <div ref={ref} className={`grid gap-6 md:grid-cols-3 ${className}`}>
      {FOUNDERS.people.map((p, i) => {
        const yrs = experience(p.bio);
        return (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            className="group skeuo-card h-full overflow-hidden"
          >
            <div className="relative">
              <div className="aspect-[4/4.2] overflow-hidden bg-cloud-200">
                <motion.img
                  src={p.photo}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/35 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/60 bg-white/75 px-3 py-1 text-[0.66rem] font-bold tracking-[-0.005em] text-azure-700 backdrop-blur-md">
                {p.role}
              </span>
              {yrs && (
                <span className="tabular absolute bottom-4 right-4 rounded-full bg-ink-900/70 px-3 py-1 text-[0.72rem] font-semibold text-white backdrop-blur-md">
                  {yrs}
                </span>
              )}
            </div>

            <div className="relative p-6">
              <Quote aria-hidden className="absolute right-6 top-6 h-8 w-8 text-azure-200/70" />
              <Heading className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink-900">
                {p.name}
              </Heading>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-600">{summary(p.bio)}</p>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-500">{p.bio}</p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
