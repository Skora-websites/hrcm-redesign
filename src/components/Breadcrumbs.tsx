import { Link } from "./Link";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="text-ink-500 transition-colors hover:text-azure-600">
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
                className="text-ink-500 transition-colors hover:text-azure-600"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-navy-900">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
