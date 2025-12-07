// src/components/Hero.jsx
// import Link from "next/link";

// export default function Hero({ bg = "/images/hero.jpg", titleLine1, titleLine2 }) {
//   const heading = titleLine1 ?? "Capture Life’s Most Beautiful Moments";
//   const heading2 = titleLine2 ?? "with CandidKlix Photography";

//   return (
//     <section
//       className="hero-root"
//       style={{
//         backgroundImage: `linear-gradient(
//           rgba(0,0,0,0.25) 0%,
//           rgba(0,0,0,0.45) 45%,
//           rgba(0,0,0,0.65) 100%
//         ), url(${bg})`,
//       }}
//       role="region"
//       aria-label="Hero"
//     >
//       <div className="hero-inner">
//         <div className="hero-content">
//           <h1 className="hero-title">
//             <span>{heading}</span>
//             <br />
//             <strong>{heading2}</strong>
//           </h1>

//           <p className="hero-sub">
//             Timeless elegance meets authentic storytelling — we preserve your
//             most precious moments with artistry and heart.
//           </p>

//           <div className="hero-ctas">
//             <Link className="btn btn-soft" href="/gallery">
//               View Portfolio
//             </Link>
//             <Link className="btn btn-accent" href="/booking">
//               Book Your Shoot Today
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";
import Link from "next/link";
import React from "react";

export default function Hero(): JSX.Element {
  return (
    <section className="hero-figma">
      <div
        className="hero-figma__bg"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
        aria-hidden
      />
      <div className="hero-figma__overlay" aria-hidden />
      <div className="hero-figma__content">
        <h1 className="hero-figma__title">
          Capture Life's Greatest
          <br />
          Moments with CandidKlix
          <br />
          Photography
        </h1>

        <p className="hero-figma__sub">
          Timeless elegance meets authentic storytelling. We preserve your most
          precious memories with artistry and heart.
        </p>

        <div className="hero-figma__ctas">
          <Link href="/portfolio" className="btn btn--rose">View Portfolio</Link>
          <Link href="/contact" className="btn btn--violet">Book Your Shoot Today</Link>
        </div>
      </div>
    </section>
  );
}
