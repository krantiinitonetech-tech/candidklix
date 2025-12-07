"use client";
import React from "react";
import Image from "next/image";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string; // e.g. /images/testimonials/sarah.jpg
  tone: "tone-rose" | "tone-blue" | "tone-violet" | "tone-peach";
  ring: "ring-rose" | "ring-blue" | "ring-violet" | "ring-peach";
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "CandidKlix captured our wedding day beautifully. Every photo tells our story with such warmth and elegance. We couldn't be happier!",
    name: "Sarah & Michael",
    role: "Wedding Clients",
    avatar: "/images/testimonials/sarah.jpg",
    tone: "tone-rose",
    ring: "ring-rose",
  },
  {
    id: "t2",
    quote:
      "The team made me feel so comfortable during my maternity shoot. The photos are absolutely stunning and I’ll treasure them forever.",
    name: "Emily Thompson",
    role: "Baby Shower Client",
    avatar: "/images/testimonials/emily.jpg",
    tone: "tone-blue",
    ring: "ring-blue",
  },
  {
    id: "t3",
    quote:
      "Professional, creative, and attentive to detail. My graduation photos turned out perfect and truly capture this milestone moment.",
    name: "David Chen",
    role: "Graduation Client",
    avatar: "/images/testimonials/david.jpg",
    tone: "tone-violet",
    ring: "ring-violet",
  },
  {
    id: "t4",
    quote:
      "CandidKlix elevated our menu with gorgeous food photography. Their artistic eye made our dishes look irresistible!",
    name: "Bella's Bistro",
    role: "Restaurant Client",
    avatar: "/images/testimonials/bella.jpg",
    tone: "tone-peach",
    ring: "ring-peach",
  },
];

export default function Testimonials(): JSX.Element {
  return (
    <section aria-labelledby="testimonials-heading" className="testimonials-root">
      <div className="testimonials-inner">
        <header className="testimonials-header">
          <h2 id="testimonials-heading">What Our Clients Say</h2>
          <p className="testimonials-sub">Hear from those who've trusted us with their precious moments</p>
        </header>

        <ul className="testimonials-grid" role="list">
          {TESTIMONIALS.map((t) => (
            <li key={t.id} className={`testimonial-card ${t.ring}`}>
              <div className={`testimonial-body ${t.tone}`}>
                <div className="quote-mark" aria-hidden>
                  {/* decorative quote glyph */}
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <path d="M7 7h3v6H5V9a2 2 0 012-2zm9 0h3v6h-5V9a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <blockquote className="testimonial-quote">“{t.quote}”</blockquote>

                <div className="testimonial-meta">
                  <div className="avatar-wrap" aria-hidden>
                    <Image src={t.avatar} alt={t.name} width={56} height={56} className="avatar" />
                  </div>
                  <div className="meta-text">
                    <div className="meta-name">{t.name}</div>
                    <div className="meta-role">{t.role}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
