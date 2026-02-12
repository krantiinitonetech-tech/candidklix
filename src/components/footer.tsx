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
            <li><Link href="/testimonials">Testimonials</Link></li>
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
            <li>📞 (555) 123-4567</li>
            <li>
              ✉️ <a href="mailto:hello@candidklix.com">hello@candidklix.com</a>
            </li>
            <li>📍 123 Photography Lane, Studio City, CA 90001</li>
          </ul>

          {/* Social Media Section */}
          <div className="social-media">
            <h4 className="footer-heading" style={{ marginTop: "1rem" }}>Connect With Us</h4>

            <a
              href="https://www.instagram.com/candid_klicks_photography/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              style={{ display: "inline-block", marginTop: "0.6rem" }}
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
                <defs>
                  <linearGradient id="IGgradient" x1="0" x2="1" y1="1" y2="0">
                    <stop offset="0%" stopColor="#f58529" />
                    <stop offset="25%" stopColor="#feda77" />
                    <stop offset="50%" stopColor="#dd2a7b" />
                    <stop offset="75%" stopColor="#8134af" />
                    <stop offset="100%" stopColor="#515bd4" />
                  </linearGradient>
                </defs>

                <rect width="48" height="48" rx="12" fill="url(#IGgradient)" />
                <path
                  fill="#fff"
                  d="M24 15c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 15c-3.3 0-6-2.7-6-6s2.7-6 6-6
               6 2.7 6 6-2.7 6-6 6zm7-16.5c0 1.2-1 2.2-2.2 2.2-1.2 0-2.2-1-2.2-2.2s1-2.2
               2.2-2.2c1.2 0 2.2 1 2.2 2.2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CandidKlix Photography. All rights reserved.
      </div>
    </footer>
  );
}
