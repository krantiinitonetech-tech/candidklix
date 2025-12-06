// components/About.tsx
"use client";
import React from "react";

export default function About(): JSX.Element {
  return (
    <section aria-labelledby="about-heading" className="about-root">
      <div className="container">
        <div className="about-grid">
          {/* Left: Text */}
          <div className="about-text">
            <h2 id="about-heading" className="about-title">About CandidKlix</h2>

            <div className="about-paragraphs">
              <p>
                Founded with a passion for preserving life's most meaningful moments,
                CandidKlix Photography brings together artistic vision and authentic emotion.
              </p>

              <p>
                We believe every photograph tells a story—your story. From intimate weddings to joyful
                celebrations, our team captures the essence of your special occasions with elegance and care.
              </p>

              <p>
                With years of experience and a commitment to excellence, we create timeless images that
                you'll treasure for generations.
              </p>
            </div>
          </div>

          {/* Right: Card */}
          <aside className="about-card-wrap" aria-hidden>
            <div className="about-card">
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h2.5l1.2-1.8A1.5 1.5 0 0 1 10.3 2h3.4a1.5 1.5 0 0 1 1.1.7L16 5h2.5A2.5 2.5 0 0 1 21 7.5v8A2.5 2.5 0 0 1 18.5 18H5.5A2.5 2.5 0 0 1 3 15.5v-8z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12.25" r="3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <h3 className="card-title">CandidKlix</h3>
              <p className="card-sub">Where Moments Become Memories</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
