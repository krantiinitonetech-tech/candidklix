// components/WhyChooseUs.tsx
import React from "react";

const features = [
  {
    tone: "tone-rose",
    title: "Natural, Candid Storytelling",
    desc: "We capture authentic moments as they unfold, creating timeless memories.",
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2l1.9 4.85L19 8.2l-3.4 2.9L16 16l-4-2-4 2 .4-4.9L4 8.2l5.1-.35L12 2z" opacity="0.12"/>
        <path d="M12 2l1.9 4.85L19 8.2l-3.4 2.9L16 16l-4-2-4 2 .4-4.9L4 8.2l5.1-.35L12 2z" stroke="currentColor" strokeWidth="1" fill="none"/>
      </svg>
    )
  },
  {
    tone: "tone-blue",
    title: "Reliable Delivery",
    desc: "Your edited photos delivered on time, every time, with no compromises.",
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" opacity="0.08"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    tone: "tone-violet",
    title: "Cinematic Editing",
    desc: "Professional color grading and retouching for stunning final images.",
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="3" opacity="0.08"/>
        <path d="M7 12c1.5-2 4.5-2 6 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    tone: "tone-peach",
    title: "Experienced Photographers",
    desc: "Skilled professionals who understand lighting, composition, and emotion.",
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="8" r="2.5" opacity="0.08"/>
        <path d="M5 20c1.8-3 4.8-5 7-5s5.2 2 7 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    )
  },
];

export default function WhyChooseUs(): JSX.Element {
  return (
    <section className="why-root" aria-labelledby="why-heading">
      <div className="why-inner">
        <header className="why-header">
          <h2 id="why-heading">Why Choose Us</h2>
          <p className="why-sub">Premium photography services backed by passion and professionalism.</p>
        </header>

        <div className="why-grid">
          {features.map((f, idx) => (
            <article className={`why-card ${f.tone}`} key={idx}>
              <div className="why-badge" aria-hidden>{f.svg}</div>
              <h3 className="why-title">{f.title}</h3>
              <p className="why-desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
