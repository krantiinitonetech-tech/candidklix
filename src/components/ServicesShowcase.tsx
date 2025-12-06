// components/ServicesShowcase.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

type Service = {
  id: string;
  title: string;
  desc: string;
  img: string;
  tone: string; // e.g. "tone-rose"
  ring?: string; // e.g. "ring-rose"
  galleryHref?: string;
  bookingHref?: string;
};

const SERVICES: Service[] = [
  {
    id: "wedding",
    title: "Wedding Photography",
    desc: "Capturing love stories with artistry and emotion. From intimate ceremonies to grand celebrations, we preserve every precious moment.",
    img: "/images/services/wedding.jpeg",
    tone: "tone-rose",
    ring: "ring-rose",
    galleryHref: "/gallery/wedding",
    bookingHref: "/contact#book",
  },
  {
    id: "baby-shower",
    title: "Baby Shower",
    desc: "Celebrating new beginnings with warmth and joy. We capture the anticipation, love, and excitement of welcoming new life.",
    img: "/images/services/baby.jpeg",
    tone: "tone-blue",
    ring: "ring-blue",
    galleryHref: "/gallery/baby-shower",
    bookingHref: "/contact#book",
  },
  {
    id: "graduation",
    title: "Graduation",
    desc: "Honoring milestones and achievements with pride. Every graduate deserves images that reflect their journey and success.",
    img: "/images/services/graduation.jpeg",
    tone: "tone-violet",
    ring: "ring-violet",
    galleryHref: "/gallery/graduation",
    bookingHref: "/contact#book",
  },
  {
    id: "food",
    title: "Food Photography",
    desc: "Making culinary creations shine with professional styling. Perfect for restaurants, menus, and food brands seeking visual appeal.",
    img: "/images/services/food.jpeg",
    tone: "tone-peach",
    ring: "ring-peach",
    galleryHref: "/gallery/food",
    bookingHref: "/contact#book",
  },
];

export default function ServicesShowcase(): JSX.Element {
  return (
    <section className="services-showcase">
      <div className="services-inner">
        <header className="services-header">
          <h2>Our Services</h2>
          <p>Authentic storytelling photography — tailored for every occasion.</p>
        </header>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <article key={s.id} className={`service-card ${s.ring ?? ""} ${s.tone}`}>
              <div className="service-media">
                <Image src={s.img} alt={s.title} fill style={{ objectFit: "cover" }} />
              </div>

              <div className="service-body">
                <div className="service-icon" aria-hidden>
                  {/* small decorative circle icon — kept semantic as decorative */}
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.06)" strokeWidth="1.2"/>
                  </svg>
                </div>

                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>

                <div className="service-actions">
                  <Link href={s.galleryHref ?? "/gallery"} className="btn btn--ghost" aria-label={`View ${s.title} gallery`}>
                    View Gallery
                  </Link>
                  <Link href={s.bookingHref ?? "/contact"} className="btn btn--pink" aria-label={`Book ${s.title}`}>
                    Book Session
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
