"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 header-root">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="logo-link">
          <div className="logo-badge">CK</div>
          <div className="flex flex-col leading-tight">
            <span className="logo-main">CandidKlix</span>
            <span className="logo-sub">Photography</span>
          </div>
        </Link>

        {/* Desktop nav – visible from md and up */}
        <nav className="hidden md:flex nav-desktop items-center gap-6 text-sm">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/gallery" className="nav-link">
            Gallery
          </Link>
          <Link href="/services" className="nav-link">
            Services
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden md:inline cta-pill-outline">
            Contact
          </Link>
          <Link href="/booking" className="cta-pill">
            Book
          </Link>

          {/* Hamburger – only on mobile/tablet (< md) */}
          <button
            aria-label="Toggle menu"
            className="md:hidden ml-2 p-2 rounded-md border"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu – only on < md */}
      <div className={`md:hidden mobile-panel ${open ? "block" : "hidden"}`}>
        <div className="px-4 pb-6 space-y-2">
          <Link href="/" className="block py-2 nav-link-mobile">
            Home
          </Link>
          <Link href="/gallery" className="block py-2 nav-link-mobile">
            Gallery
          </Link>
          <Link href="/services" className="block py-2 nav-link-mobile">
            Services
          </Link>
          <Link href="/about" className="block py-2 nav-link-mobile">
            About
          </Link>
          <div className="pt-4 border-t">
            <Link
              href="/booking"
              className="block py-2 cta-pill w-full text-center"
            >
              Book a shoot
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
