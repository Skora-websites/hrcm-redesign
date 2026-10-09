import { MARQUEE_SERVICES } from "../../data/content";

export function ServiceMarquee() {
  const items = [...MARQUEE_SERVICES, ...MARQUEE_SERVICES];
  return (
    <section
      aria-label="Our services"
      className="border-y border-mist-200 bg-white py-4 text-ink-600"
    >
      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex min-w-max animate-marquee items-center gap-10 pr-10">
          {items.map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.14em]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-azure-500" aria-hidden />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
