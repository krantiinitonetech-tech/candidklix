//Changed logo size


"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
  
<div className="brand">
  <Link href="/" className="brand-link" aria-label="CandidKlix home">
    <div className="brand-logo-wrapper" aria-hidden="false">
      <div className="logo-fill">
        {/* <Image
          src="/candidklix-logo252.png"
          alt="CandidKlix"
          fill
          sizes="(max-width:900px) 120px, 260px"
          className="brand-logo-img"
          priority
        /> */}
<Image
  src="/candidklix-logo252.png"
  alt="CandidKlix Photography"
  width={190}
  height={50}
  priority
  className="brand-logo-img"
/>

      </div>
    </div>
  </Link>
</div>


        <nav className={`main-nav ${open ? "open" : ""}`}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/#services" className="nav-link">Services</Link>
          <Link href="/gallery" className="nav-link">Gallery</Link>
          <Link href="/booking" className="nav-link">Contact</Link>
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

      <div
        className={`mobile-panel ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      >
        <div
          className="mobile-inner"
          onClick={(e) => e.stopPropagation()}
        >
        <Link href="/" className="mobile-link" onClick={() => setOpen(false)}>Home</Link>
<Link href="/about" className="mobile-link" onClick={() => setOpen(false)}>About</Link>
<Link href="/#services" className="mobile-link" onClick={() => setOpen(false)}>Services</Link>
<Link href="/gallery" className="mobile-link" onClick={() => setOpen(false)}>Gallery</Link>
<Link href="/booking" className="mobile-link" onClick={() => setOpen(false)}>Contact</Link>
<Link href="/booking" className="mobile-cta" onClick={() => setOpen(false)}>Book Session</Link>
        </div>
      </div>
    </header>
  );
}
