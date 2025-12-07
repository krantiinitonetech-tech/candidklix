// components/Gallery.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Static gallery implementation:
 * - Uses images from /public/images/gallery-static/
 * - Navigation links replace filter chips and route to category pages
 * - "View All" links to /gallery
 *
 * Update STATIC_IMAGES if you use different filenames.
 */

const STATIC_IMAGES = [
  "/images/gallery-static/img1.jpg",
  "/images/gallery-static/img2.jpg",
  "/images/gallery-static/img3.jpg",
  "/images/gallery-static/img4.jpg",
  "/images/gallery-static/img5.jpg",
  "/images/gallery-static/img6.jpg",
  "/images/gallery-static/img7.jpg",
  "/images/gallery-static/img8.jpg",
];

const NAV_LINKS = [
  { label: "All", href: "/gallery" },
  { label: "Wedding", href: "/gallery/wedding" },
  { label: "Baby Shower", href: "/gallery/baby-shower" },
  { label: "Graduation", href: "/gallery/graduation" },
  { label: "Food", href: "/gallery/food" },
  { label: "Others", href: "/gallery/others" },
];

export default function Gallery(): React.ReactElement {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="gallery-heading" className="gallery-root">
      <div className="gallery-inner">
        <header className="gallery-header">
          <h2 id="gallery-heading">Our Gallery</h2>
          <p className="gallery-sub">Explore our collection of captured moments</p>

          <nav className="gallery-nav" aria-label="Gallery navigation">
            {NAV_LINKS.map((n) => (
              <Link key={n.href} href={n.href} className="nav-link">
                {n.label}
              </Link>
            ))}
          </nav>
        </header>

        <div className="gallery-grid" role="list">
          {STATIC_IMAGES.map((src, idx) => (
            <button
              key={src}
              className="gallery-tile"
              onClick={() => setLightboxIndex(idx)}
              aria-label={`Open image ${idx + 1}`}
              role="listitem"
            >
              <div className="gallery-media">
                <Image
                  src={src}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  priority={idx < 4} // priority for the first row
                />
              </div>
            </button>
          ))}
        </div>

        <div className="gallery-cta-wrap">
          <Link href="/gallery" className="btn btn--mint">View All</Link>
        </div>
      </div>

      {/* Lightbox (simple) */}
      {lightboxIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close">✕</button>

          <button
            className="lightbox-prev"
            onClick={() => setLightboxIndex(i => (i! - 1 + STATIC_IMAGES.length) % STATIC_IMAGES.length)}
            aria-label="Previous"
          >
            ‹
          </button>

          <div className="lightbox-content">
            <Image
              src={STATIC_IMAGES[lightboxIndex]}
              alt={`Gallery image ${lightboxIndex + 1}`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <button
            className="lightbox-next"
            onClick={() => setLightboxIndex(i => (i! + 1) % STATIC_IMAGES.length)}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}






// // components/Gallery.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// /**
//  * IMPORTANT:
//  * - To use images hosted on Google Drive or other external hosts, add the host
//  *   to next.config.js `images.domains` or use external URLs that your Next/Image config allows.
//  *
//  * - To make this static gallery show your Drive images: replace the `src` strings
//  *   below with the public-facing Drive URLs (or local /public paths).
//  */

// /* --------- Replace these image entries with your Drive URLs or local paths --------- */
// const GALLERY_IMAGES = [
//   { id: "g1", title: "Wedding", src: "/images/gallery/wedding.jpg", alt: "Bride and groom embracing" },
//   { id: "g2", title: "Baby", src: "/images/gallery/baby.jpg", alt: "Sleeping newborn" },
//   { id: "g3", title: "Graduation", src: "/images/gallery/graduation.jpg", alt: "Graduate in cap and gown" },
//   { id: "g4", title: "Food", src: "/images/gallery/food.jpg", alt: "Gourmet plating" },
//   { id: "g5", title: "Photographer", src: "/images/gallery/photographer.jpg", alt: "Photographer with camera" },
//   { id: "g6", title: "Family", src: "/images/gallery/family.jpg", alt: "Family hugging" },
//   { id: "g7", title: "Drink", src: "/images/gallery/drink.jpg", alt: "Cocktail on table" },
//   { id: "g8", title: "Portrait", src: "/images/gallery/portrait.jpg", alt: "Portrait with closed eyes" },
// ];
// /* ---------------------------------------------------------------------------------- */

// /* Navigation links that go to pages (update routes as needed) */
// const NAV_LINKS = [
//   { label: "All", href: "/gallery" },
//   { label: "Wedding", href: "/gallery/wedding" },
//   { label: "Baby Shower", href: "/gallery/baby-shower" },
//   { label: "Graduation", href: "/gallery/graduation" },
//   { label: "Food", href: "/gallery/food" },
//   { label: "Others", href: "/gallery/others" },
// ];

// export default function Gallery(): React.ReactElement {
//   const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
//   const images = GALLERY_IMAGES; // static array — no in-place filtering

//   // keyboard navigation for lightbox
//   useEffect(() => {
//     function onKey(e: KeyboardEvent) {
//       if (lightboxIndex === null) return;
//       if (e.key === "ArrowRight") setLightboxIndex(i => (i! + 1) % images.length);
//       if (e.key === "ArrowLeft") setLightboxIndex(i => (i! - 1 + images.length) % images.length);
//       if (e.key === "Escape") setLightboxIndex(null);
//     }
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [lightboxIndex, images.length]);

//   return (
//     <section aria-labelledby="gallery-heading" className="gallery-root">
//       <div className="gallery-inner">
//         <header className="gallery-header">
//           <h2 id="gallery-heading">Our Gallery</h2>
//           <p className="gallery-sub">Explore our collection of captured moments</p>

//           <nav className="gallery-filters" aria-label="Gallery navigation">
//             {NAV_LINKS.map((ln) => (
//               <Link key={ln.href} href={ln.href} className="pill">
//                 {ln.label}
//               </Link>
//             ))}
//           </nav>
//         </header>

//         <div className="gallery-grid" role="list">
//           {images.map((it, idx) => (
//             <button
//               key={it.id}
//               className="gallery-tile"
//               onClick={() => setLightboxIndex(idx)}
//               aria-label={`Open ${it.title}`}
//               role="listitem"
//             >
//               <div className="gallery-media">
//                 <Image
//                   src={it.src}
//                   alt={it.alt}
//                   fill
//                   style={{ objectFit: "cover", objectPosition: "center" }}
//                   priority={false}
//                 />
//               </div>
//             </button>
//           ))}
//         </div>

//         <div className="gallery-cta-wrap">
//           <Link href="/gallery" className="btn btn--mint">View All</Link>
//         </div>
//       </div>

//       {/* Lightbox (unchanged) */}
//       {lightboxIndex !== null && (
//         <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
//           <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close">✕</button>

//           <button className="lightbox-prev" onClick={() => setLightboxIndex(i => (i! - 1 + images.length) % images.length)} aria-label="Previous">‹</button>
//           <div className="lightbox-content">
//             <Image src={images[lightboxIndex].src} alt={images[lightboxIndex].alt} fill style={{ objectFit: "contain" }} />
//             <div className="lightbox-caption">{images[lightboxIndex].title}</div>
//           </div>
//           <button className="lightbox-next" onClick={() => setLightboxIndex(i => (i! + 1) % images.length)} aria-label="Next">›</button>
//         </div>
//       )}
//     </section>
//   );
// }
