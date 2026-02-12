// components/Breadcrumb.tsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Crumb = { href: string; label: string };

export default function Breadcrumb({ items, showHome = true }: { items?: Crumb[]; showHome?: boolean }) {
  const pathname = usePathname() || "/";
  const auto = React.useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    let cur = "";
    return parts.map(p => {
      cur += `/${p}`;
      return { href: cur, label: p.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase()) };
    });
  }, [pathname]);

  const list = (items && items.length ? items : auto) ?? [];
  const display = showHome ? [{ href: "/", label: "Home" }, ...list] : list;

  return (
    <nav aria-label="breadcrumb" className="breadcrumb">
      <ol className="flex items-center">
        {display.map((c, i) => {
          const last = i === display.length - 1;
          return (
            <li key={`${c.href}-${i}`} className="flex items-center">
              {!last ? (
                <Link href={c.href} className="ck-home">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="ck-current">{c.label}</span>
              )}
              {!last && <span className="ck-sep" aria-hidden>›</span>}
            </li>
          );
        })}
      </ol>
      <style jsx>{`
  .ck-breadcrumb {
    padding: 12px 20px;
    border-bottom: 1px solid #f3f3f3;
    font-family: var(--font-body);
  }

  .ck-home {
    font-family: var(--font-heading);
    font-size: 20px;
    color: #4b0082;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .ck-sep {
    margin: 0 12px;
    color: #bcbcbc;
    font-size: 20px;
    font-family: var(--font-body);
  }

  .ck-current {
    font-family: var(--font-heading);
    font-size: 15px;
    color: #111;
    font-weight: 700;
    margin-left: 4px;
  }

  @media (max-width: 640px) {
    .ck-home,
    .ck-current {
      font-size: 18px;
    }
    .ck-sep {
      margin: 0 8px;
    }
  }
`}</style>

    </nav>
  );
}
