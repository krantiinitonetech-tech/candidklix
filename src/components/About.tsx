// components/About.tsx
"use client";
import React from "react";
import Image from "next/image";


export default function About(): React.ReactElement {
  return (
    <section aria-labelledby="about-heading" className="about-roots">
      <div className="container">
        <div className="about-grid">
          {/* Left: Text */}
          <div className="about-text">
            <h2 id="about-heading" className="about-title">About CandidKlix</h2>

            <div className="about-paragraphs">
              <p>
               At Candid Klix, capturing memories isn’t just what we do — it’s Who we are?
Our journey began in 2012, sparked by a simple Sony Cyber-shot and a deep love for freezing moments that can never be recreated.
We don’t see photography as a business. For us, it’s about real emotions, genuine connections, and stories unfolding naturally. Every click is guided by honesty, warmth, and an artistic eye that values moments as they happen — unscripted and true.
With an eye for detail and a deep respect for authenticity, we document moments as they unfold — gracefully, naturally, and beautifully. Our purpose is simple yet profound to transform fleeting moments into enduring memories, captured with warmth, artistry, and soul because the moments that matter most deserve to be captured beautifully — and remembered forever.
</p>
            </div>
          </div>

          {/* Right: Card */}
         {/* Right: Image replacing the card */}
<aside className="about-card-wrap" aria-hidden>
  <div className="about-image-card">
    <Image
      src="/about-couple.jpg"   // <-- Put your image in /public and update filename
      alt="CandidKlix Photography"
      width={520}
      height={420}
      className="about-image"/>
  </div>
</aside>

        </div>
      </div>
    </section>
  );
}
