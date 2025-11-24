// src/components/Footer.jsx
"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Top 4-column footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1: Brand */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">CandidKlix</h2>
          <p className="text-sm leading-relaxed text-gray-300">
            CandidKlix captures life's most meaningful moments — from weddings,
            portraits, events and stories that last forever. Our passion is to
            turn your emotions into timeless visuals.
          </p>
        </div>

        {/* Column 2: Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/services" className="hover:underline">Services</Link></li>
            <li><Link href="/portfolio" className="hover:underline">Portfolio</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
          </ul>
        </div>

        {/* Column 3: Other Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Other Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact + Instagram */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><span>Address:</span> Your address here</li>
            <li><span>Contact No:</span> +1 (555) 555-5555</li>
            <li>
              Email:{" "}
              <a
                href="mailto:hello@candidklix.com"
                className="hover:underline"
              >
                hello@candidklix.com
              </a>
            </li>
          </ul>

          {/* Social media */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-3">Follow</h4>
            <a
              href="https://www.instagram.com/candid_klicks_photography/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CandidKlix on Instagram"
              className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-md"
            >
              {/* Instagram Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5 6.5h.01"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-gray-100">Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-400">
          Copyright © {new Date().getFullYear()} candidklix.com All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
