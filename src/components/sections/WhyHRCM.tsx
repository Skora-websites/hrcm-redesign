import { WHY } from "../../data/content";
import { Icon } from "../Icon";
import { Reveal, SectionHeading } from "../ui";

export function WhyHRCM() {
  return (
    <section id="why-hrcm" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="left"
          label={WHY.label}
          title={WHY.heading}
          intro={WHY.intro}
        />

        {/* Editorial numbered rows — hairline-separated, no cards */}
        <div className="mt-14 border-t border-navy-900/10">
          {WHY.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="grid grid-cols-[2.75rem_1fr] items-start gap-x-5 border-b border-navy-900/10 py-8 md:grid-cols-[5rem_19rem_1fr] md:gap-x-10">
                <span className="text-xl font-bold text-azure-500/70 md:text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex items-center gap-3 text-lg font-semibold text-navy-900 md:text-xl">
                  <Icon name={item.icon} className="h-5 w-5 shrink-0 text-azure-500" />
                  {item.title}
                </h3>
                <p className="col-span-2 mt-3 max-w-2xl text-sm leading-relaxed text-ink-600 md:col-span-1 md:mt-0">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
