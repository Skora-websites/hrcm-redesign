import { Link } from "./Link";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href="/"
            className="rounded-full px-2 py-1 text-ink-500 transition-colors hover:bg-white/70 hover:text-azure-700"
          >
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden className="text-mist-200">
              /
            </span>
            {item.href ? (
              <Link
                href={item.href}
                className="rounded-full px-2 py-1 text-ink-500 transition-colors hover:bg-white/70 hover:text-azure-700"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="rounded-full border border-white/70 bg-white/60 px-3 py-1 font-medium text-ink-800 backdrop-blur-md"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
