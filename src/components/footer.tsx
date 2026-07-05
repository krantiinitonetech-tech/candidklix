"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-grid">

        {/* Column 1 — Brand */}
        <div className="footer-col">
          <div className="footer-brand">

            {/* Updated Logo */}
            <div className="footer-logo-wrapper">
              <Image
                src="/candidklix-logo252.png"   // Your uploaded logo file
                alt="CandidKlix Logo"
                width={180}                  // Adjust size as needed
                height={60}
                className="footer-logo-img"
                priority
              />
            </div>

          </div>

          <p className="brand-desc">
            Capturing life's greatest moments with timeless elegance and authentic storytelling.
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="footer-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
          </ul>
        </div>

        {/* Column 3 — Policies */}
        <div className="footer-col">
          <h3 className="footer-heading">Policies</h3>
          <ul className="footer-list">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/booking-policy">Booking Policy</Link></li>
            <li><Link href="/cancellation">Cancellation</Link></li>
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div className="footer-col">
          <h3 className="footer-heading">Contact Us</h3>

          <ul className="footer-list">
            <li style={{ display: "flex", alignItems: "center", gap: "16px" }}>
  <a
    href="https://wa.me/18165902011"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    style={{ display: "inline-flex", alignItems: "center" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 32 33"
      fill="#25D366"
    >
      <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.89.76 5.6 2.09 7.96L0 32l7.84-2.05c2.3 1.26 4.93 1.98 7.76 1.98 8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.04c-2.5 0-4.84-.73-6.82-1.98l-.49-.29-4.66 1.22 1.24-4.54-.32-.47A13.46 13.46 0 0 1 2.54 16.4C2.54 9.21 8.81 2.94 16 2.94c7.19 0 13.46 6.27 13.46 13.46 0 7.19-6.27 13.46-13.46 13.46zm7.41-9.93c-.4-.2-2.36-1.16-2.73-1.3-.37-.14-.64-.2-.91.2-.27.4-1.05 1.3-1.29 1.57-.24.27-.47.3-.87.1-.4-.2-1.7-.63-3.24-2.02-1.2-1.07-2.01-2.4-2.25-2.8-.24-.4-.03-.62.18-.82.18-.18.4-.47.6-.7.2-.24.27-.4.4-.67.14-.27.07-.5-.03-.7-.1-.2-.91-2.2-1.25-3.02-.33-.8-.66-.7-.91-.71l-.78-.01c-.27 0-.7.1-1.07.5-.37.4-1.4 1.36-1.4 3.3 0 1.94 1.43 3.82 1.63 4.08.2.27 2.8 4.27 6.79 5.98.95.41 1.69.66 2.27.85.95.3 1.82.26 2.5.16.76-.11 2.36-.96 2.69-1.88.33-.92.33-1.7.23-1.87-.1-.17-.37-.27-.77-.47z"/>
    </svg>
      <span>(+1) 816-590-2011</span>
  </a>

</li>
            <li>
              ✉️ <a href="mailto:candidklixphotography@gmail.com">candidklixphotography@gmail.com</a>
            </li>
            <li>📍DMV Area</li>
          </ul>

          {/* Social Media Section */}
     {/* Social Media Section */}
<div className="social-media">
  <h4 className="footer-heading" style={{ marginTop: "1rem" }}>
    Connect With Us
  </h4>

  <div className="social-row" style={{ marginTop: "0.8rem" }}>
    
    {/* Instagram */}
    <a
      href="https://www.instagram.com/candid_klicks_photography/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      style={{ display: "flex", width: 48, height: 48 }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="igGrad" x1="0" x2="1" y1="1" y2="0">
            <stop offset="0%" stopColor="#f58529" />
            <stop offset="25%" stopColor="#feda77" />
            <stop offset="50%" stopColor="#dd2a7b" />
            <stop offset="75%" stopColor="#8134af" />
            <stop offset="100%" stopColor="#515bd4" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#igGrad)" />
        <path
          fill="#fff"
          d="M24 15c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 15c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
        />
      </svg>
    </a>

    {/* Facebook */}
    <a
      href="https://www.facebook.com/share/18JmTrcwXY/?mibextid=wwXIfr"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      style={{ display: "flex", width: 48, height: 48 }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48">
        <rect width="48" height="48" rx="12" fill="#1877F2"/>
        <path
          fill="#fff"
          d="M28 24h3l1-4h-4v-2c0-1 .4-2 2-2h2v-4h-3c-4 0-6 2-6 6v2h-3v4h3v12h5V24z"
        />
      </svg>
    </a>

  </div>
</div>

        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CandidKlix Photography. All rights reserved.
      </div>
    </footer>
  );
}
