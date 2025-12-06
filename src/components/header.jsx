"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <Link
            href="/"
            className="brand-link"
            aria-label="CandidKlix home"
          >
            <svg
              className="brand-logo"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="6"
                width="20"
                height="12"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="12" r="2.2" fill="currentColor" />
              <path
                d="M7 6l1-2h8l1 2"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <span className="brand-text">CandidKlix</span>
          </Link>
        </div>

        <nav className={`main-nav ${open ? "open" : ""}`}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/gallery" className="nav-link">Gallery</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>

        <div className="actions">
          <Link href="/booking" className="btn-cta">Book Session</Link>

          <button
            className={`hamburger ${open ? "is-open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-panel ${open ? "show" : ""}`} onClick={() => setOpen(false)}>
        <div className="mobile-inner" onClick={(e) => e.stopPropagation()}>
          <Link href="/" className="mobile-link">Home</Link>
          <Link href="/about" className="mobile-link">About</Link>
          <Link href="/services" className="mobile-link">Services</Link>
          <Link href="/gallery" className="mobile-link">Gallery</Link>
          <Link href="/contact" className="mobile-link">Contact</Link>
          <Link href="/booking" className="mobile-cta">Book Session</Link>
        </div>
      </div>
    </header>
  );
}
