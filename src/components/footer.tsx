"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-grid">
        {/* Column 1 — Brand */}
        <div className="footer-col">
          <div className="footer-brand">
            <div className="logo-badge">CK</div>
            <span className="brand-title">CandidKlix</span>
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
            <li><Link href="/booking">Booking Policy</Link></li>
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

          <div className="social-row">
            <div className="social-dot ig"></div>
            <div className="social-dot fb"></div>
            <div className="social-dot x"></div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CandidKlix Photography. All rights reserved.
      </div>
    </footer>
  );
}
