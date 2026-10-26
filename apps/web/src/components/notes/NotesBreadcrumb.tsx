import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NotesBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function NotesBreadcrumb({
  items,
}: NotesBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 overflow-x-auto whitespace-nowrap text-sm"
    >
      <Link
        href="/notes"
        className="flex shrink-0 items-center gap-1.5 font-medium text-slate-500 transition hover:text-blue-600"
      >
        <Home className="h-4 w-4" />
        Explore Notes
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex shrink-0 items-center gap-1"
          >
            <ChevronRight className="h-4 w-4 text-slate-300" />

            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="font-medium text-slate-500 transition hover:text-blue-600"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast
                    ? "font-semibold text-slate-900"
                    : "font-medium text-slate-500"
                }
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}