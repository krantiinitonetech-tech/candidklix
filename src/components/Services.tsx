// components/Services.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeartIcon from "@/components/icons/HeartIcon";
import BabyIcon from "@/components/icons/BabyIcon";
import GraduationIcon from "@/components/icons/GraduationIcon";
import ForkKnifeIcon from "@/components/icons/ForkKnifeIcon";

/* inside each card, replace placeholder <svg> with:
  <HeartIcon className="w-7 h-7 text-rose-300" />
  <BabyIcon className="w-7 h-7 text-sky-300" />
  <GraduationIcon className="w-7 h-7 text-violet-300" />
  <ForkKnifeIcon className="w-7 h-7 text-rose-300" />
*/

const SERVICES = [
  { id: "wedding", title: "Wedding", desc: "Capture every precious moment of your special day with timeless elegance and romantic artistry.", img: "/images/services/wedding.jpeg", tone: "tone-rose", ring: "ring-rose" },
  { id: "baby", title: "Baby Shower", desc: "Celebrate new beginnings with soft, joyful photography that captures the warmth and anticipation.", img: "/images/services/baby.jpeg", tone: "tone-blue", ring: "ring-blue" },
  { id: "graduation", title: "Graduation", desc: "Mark this milestone with professional portraits that honor your hard work and success.", img: "/images/services/graduation.jpeg", tone: "tone-violet", ring: "ring-violet" },
  { id: "food", title: "Food Photography", desc: "Showcase culinary artistry with stunning imagery that makes every dish irresistibly appetizing.", img: "/images/services/food.jpeg", tone: "tone-peach", ring: "ring-peach" },
];

export default function Services(): React.ReactElement {
  return (
    <section aria-labelledby="services-headings" className="services-roots">
      <div className="services-inners">
        <header className="services-headers">
          <h2 id="services-headings">Our Services</h2>
          <p>We specialize in capturing life's most important moments with artistry and authenticity</p>
        </header>

        <div className="services-grids">
          {SERVICES.map((s) => (
            <article key={s.id} className={`service-cards ${s.ring}`}>
              <div className="service-medias">
                <Image src={s.img} alt={s.title} fill style={{ objectFit: "cover", objectPosition: "center" }} />
              </div>

              <div className={`service-bodys ${s.tone}`}>
                <div>
                  <div className="service-icons" aria-hidden>
                    {/* replace with exact SVG if you have one */}
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 7v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </div>

                  <h3 className="service-titles">{s.title}</h3>
                  <p className="service-descs">{s.desc}</p>
                </div>

                {/* <div className="service-footer">
                  <Link href={`/services#${s.id}`} className="service-learn">Learn more</Link>
                </div> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
