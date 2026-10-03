import { WHY } from "../../data/content";
import { Icon } from "../Icon";
import { Reveal, SectionHeading } from "../ui";

export function WhyHRCM() {
  return (
    <section id="why-hrcm" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading label={WHY.label} title={WHY.heading} intro={WHY.intro} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.07}
              className={i === 0 ? "lg:col-span-2 lg:col-start-1" : ""}
            >
              <div className="group flex h-full flex-col rounded-3xl border border-mist-200 bg-mist-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-azure-300 hover:bg-white hover:shadow-lift">
                <div className="flex items-center gap-4">
                  <span className="inline-flex rounded-xl bg-navy-900 p-3 text-azure-400 transition-colors duration-300 group-hover:bg-azure-500 group-hover:text-white">
                    <Icon name={item.icon} className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
