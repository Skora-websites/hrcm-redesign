import { Hero } from "../components/sections/Hero";
import { ServiceMarquee } from "../components/sections/ServiceMarquee";
import { About } from "../components/sections/About";
import { Services } from "../components/sections/Services";
import { Process } from "../components/sections/Process";
import { Impact } from "../components/sections/Impact";
import { WhyHRCM } from "../components/sections/WhyHRCM";
import { ComingSoon } from "../components/sections/ComingSoon";
import { Founders } from "../components/sections/Founders";
import { Contact } from "../components/sections/Contact";

export function HomePage() {
  return (
    <main>
      <Hero />
      <ServiceMarquee />
      <About />
      <Services />
      <Process />
      <Impact />
      <WhyHRCM />
      <ComingSoon />
      <Founders />
      <Contact />
    </main>
  );
}
