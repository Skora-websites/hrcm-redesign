import { useEffect, Suspense, lazy } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useRoute } from "./router";
import { SERVICES } from "./data/content";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { WhyPage } from "./pages/WhyPage";
import { TeamPage } from "./pages/TeamPage";
import { ContactPage } from "./pages/ContactPage";
import { SoftwarePage } from "./pages/SoftwarePage";
import { CareersPage } from "./pages/CareersPage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const Agentation = lazy(() =>
  import("agentation").then((mod) => ({ default: mod.Agentation }))
);

const TITLES: Record<string, string> = {
  home: "HRCM | Revenue Cycle Management Services",
  about: "About Us | HRCM Revenue Cycle Management",
  services: "Our Services | HRCM Revenue Cycle Management",
  why: "Why Choose Us | HRCM Revenue Cycle Management",
  team: "Our Team | HRCM Leadership",
  software: "HRCM Software | AI-Powered Healthcare Revenue Cycle Management",
  careers: "Careers at HRCM | Healthcare Technology & Operations",
  contact: "Get In Touch | HRCM",
  terms: "Terms & Conditions | HRCM",
  privacy: "Privacy Policy | HRCM",
  "404": "Page Not Found | HRCM",
};

function serviceSlugFromLocation(): string | null {
  const m = window.location.pathname.match(/^\/services\/(.+?)(\.html)?\/?$/);
  if (!m) return null;
  const slug = m[1];
  const known = SERVICES.some(
    (s) => s.href.replace(/^\/services\//, "").replace(/\.html$/, "") === slug,
  );
  return known ? slug : null;
}

export default function App() {
  const route = useRoute();
  const slug = route === "service-detail" ? serviceSlugFromLocation() : null;

  // Keep document.title in sync with the active page
  useEffect(() => {
    if (route === "service-detail" && slug) {
      const svc = SERVICES.find(
        (s) => s.href.replace(/^\/services\//, "").replace(/\.html$/, "") === slug,
      );
      document.title = svc ? `${svc.title} | HRCM Services` : TITLES["404"];
    } else {
      document.title = TITLES[route] ?? TITLES["404"];
    }
  }, [route, slug]);

  let page;
  switch (route) {
    case "home":
      page = <HomePage />;
      break;
    case "about":
      page = <AboutPage />;
      break;
    case "services":
      page = <ServicesPage />;
      break;
    case "service-detail":
      page = slug ? <ServiceDetailPage slug={slug} /> : <NotFoundPage />;
      break;
    case "why":
      page = <WhyPage />;
      break;
    case "team":
      page = <TeamPage />;
      break;
    case "software":
      page = <SoftwarePage />;
      break;
    case "careers":
      page = <CareersPage />;
      break;
    case "contact":
      page = <ContactPage />;
      break;
    case "terms":
      page = <LegalPage which="terms" />;
      break;
    case "privacy":
      page = <LegalPage which="privacy" />;
      break;
    default:
      page = <NotFoundPage />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-900 focus:shadow-lift"
      >
        Skip to content
      </a>
      <Header />
      <div id="main" className="flex-1">
        {page}
      </div>
      <Footer />
      {process.env.NODE_ENV === "development" && (
        <Suspense fallback={null}>
          <Agentation />
        </Suspense>
      )}
    </div>
  );
}
