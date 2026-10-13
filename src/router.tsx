import { useEffect, useState } from "react";
import { SERVICES } from "./data/content";

export type PageKind =
  | "home"
  | "about"
  | "services"
  | "service-detail"
  | "why"
  | "team"
  | "contact"
  | "terms"
  | "privacy"
  | "404";

/**
 * Normalize a location pathname to a page key. Supports both directory-style
 * URLs (/about/) and the plain .html files this build emits (/about.html),
 * plus extension-less file URLs (/about) — so the site works on any static
 * host without rewrites.
 */
export function normalizePath(pathname: string): PageKind {
  let p = pathname.split("?")[0].split("#")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  p = p.replace(/\.html$/, "").replace(/\/index$/, "");
  if (p === "" || p === "/") return "home";

  const serviceSlugs = SERVICES.map((s) =>
    s.href.replace(/^\/services\//, "").replace(/\.html$/, ""),
  );
  const svc = p.match(/^\/services\/(.+)$/);
  if (svc) {
    return serviceSlugs.includes(svc[1]) ? "service-detail" : "404";
  }

  switch (p) {
    case "/about":
      return "about";
    case "/services":
      return "services";
    case "/why-choose-us":
      return "why";
    case "/our-team":
      return "team";
    case "/get-in-touch":
      return "contact";
    case "/terms":
      return "terms";
    case "/privacy":
      return "privacy";
    default:
      return "404";
  }
}

export function useRoute(): PageKind {
  // Store the pathname (not just the PageKind) so that a history change to a
  // different URL of the same kind — e.g. one service detail to another —
  // still triggers a re-render and re-resolves the slug.
  const [path, setPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return normalizePath(path);
}

export function navigate(href: string) {
  window.location.assign(href);
}
