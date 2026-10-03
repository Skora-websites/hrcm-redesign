import { MARQUEE_SERVICES } from "../../data/content";

export function ServiceMarquee() {
  const items = [...MARQUEE_SERVICES, ...MARQUEE_SERVICES];
  return (
    <section aria-label="Our services" className="bg-azure-600 py-4 text-white">
      <div className="relative flex overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
        <div className="flex min-w-max animate-marquee items-center gap-10 pr-10">
          {items.map((s, i) => (
            <span key={i} className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.14em]">
              {s}
              <span aria-hidden className="text-white/50">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
