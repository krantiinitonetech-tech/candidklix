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
                src="/candidklix-logo24.png"   // Your uploaded logo file
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
            <li>📞  (+1) 816-590-2011</li>
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
      href="https://www.facebook.com/"
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
