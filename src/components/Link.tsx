import type { AnchorHTMLAttributes } from "react";

function isInternalPage(href: string): boolean {
  return (
    href.startsWith("/") &&
    !href.endsWith(".php") &&
    !href.includes("#") &&
    !/\.(png|jpe?g|svg|pdf|css|js|ico|xml|txt)$/.test(href)
  );
}

export function Link({
  href,
  children,
  ...rest
}: { href: string; children: React.ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      {...(isInternalPage(href)
        ? {
            onClick: (e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              window.history.pushState({}, "", href);
              window.dispatchEvent(new PopStateEvent("popstate"));
              window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
            },
          }
        : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
