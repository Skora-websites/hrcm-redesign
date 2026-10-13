import type { Ref } from "react";
import { motion } from "framer-motion";
import { SERVICES } from "../data/content";
import { ServiceArt } from "./art";
import { Link } from "./Link";

/** First sentence of a service description — no mid-word "…" truncation. */
export function blurb(text: string): string {
  const m = text.match(/^[^.!?]*[.!?]/);
  return (m ? m[0] : text).trim();
}

function slugOf(href: string): string {
  return href.replace(/^\/services\//, "").replace(/\.html$/, "");
}

/**
 * Editorial index of services — each row carries the matching illustration
 * thumbnail, so imagery always tracks the title. Shared by the homepage
 * Services section and the Services page; `heading` keeps each page's
 * heading level valid (h3 under the homepage section heading, h2 on the
 * standalone Services page).
 */
export function ServicesIndex({
  heading,
  ref,
}: {
  heading: "h2" | "h3";
  ref?: Ref<HTMLDivElement>;
}) {
  const Heading = heading;
  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s) => {
        const slug = slugOf(s.href);
        return (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={s.href} className="group bento-item flex h-full flex-col">
              {/* Illustration thumbnail */}
              <div className="relative overflow-hidden rounded-t-[26px] bg-gradient-to-br from-azure-50 to-aqua-50">
                <ServiceArt slug={slug} className="h-32 w-full" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <Heading className="text-[1.12rem] font-semibold leading-snug tracking-[-0.015em] text-ink-900 transition-colors duration-300 group-hover:text-azure-700">
                  {s.title}
                </Heading>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-600">
                  {blurb(s.text)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-azure-600">
                  View service
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    ›
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
