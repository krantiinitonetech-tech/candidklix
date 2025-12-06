"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function niceName(seg) {
  if (!seg) return "";
  return seg
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumbs({ rootLabel = "Home" }) {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);

  const items = [
    { href: "/", label: rootLabel },
    ...parts.map((seg, idx) => {
      const href = "/" + parts.slice(0, idx + 1).join("/");
      return { href, label: niceName(seg) };
    }),
  ];

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
      <ol className="flex items-center gap-2">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center">
            {i > 0 && <span className="mx-2 text-gray-400">/</span>}
            {i === items.length - 1 ? (
              <span className="text-gray-800 font-medium">{it.label}</span>
            ) : (
              <Link href={it.href} className="hover:underline">
                {it.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
