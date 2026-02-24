// components/GalleryCollections.tsx
"use client";
import Link from "next/link";
import Image from "next/image";

const COLLECTIONS = [
  {
    id: "wedding",
    title: "WEDDING",
    img: "/images/gallery-covers/wedding.png",
  },
  {
    id: "baby-shower",
    title: "Maternity & Baby Shower",
    img: "/images/gallery-covers/baby.jpg",
  },
  {
    id: "food",
    title: "Food",
    img: "/images/gallery-covers/food.jpg",
  },
  {
    id: "graduation",
    title: "18th Birthday",
    img: "/images/gallery-covers/graduation.jpg",
  },
];

export default function GalleryCollections() {
  return (
    <section className="gallery-page">
      {/* Header Section */}
      <div className="gallery-hero">
        <h1>Gallery</h1>
        <p>A collection of moments, stories, and emotions.</p>
      </div>

      {/* Grid */}
      <div className="gallery-grid">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.id}
           href={`/gallery/${c.id}-photography`}
            className="gallery-card"
          >
            <div className="gallery-image">
              <Image
                src={c.img}
                alt={c.title}
                fill
                priority
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="gallery-overlay">
              <h3>{c.title}</h3>
              <span>View Gallery</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}



// // components/GalleryCollections.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// const COLLECTIONS = [
//   { id: "wedding", title: "Wedding", desc: "Celebrate love stories and timeless vows", img: "/images/gallery-covers/wedding.jpeg" },
//   { id: "baby-shower", title: "Baby Shower", desc: "Sweet moments welcoming new life", img: "/images/gallery-covers/baby.jpeg" },
//   { id: "graduation", title: "Graduation", desc: "Celebrating achievements and milestones", img: "/images/gallery-covers/graduation.jpeg" },
//   { id: "food", title: "Food Photography", desc: "Culinary artistry captured beautifully", img: "/images/gallery-covers/food.jpeg" },
//   { id: "others", title: "Others", desc: "Diverse moments from special occasions", img: "/images/gallery-covers/others.jpeg" },
// ];

// export default function GalleryCollections(): React.ReactElement {
//   return (
//     <main className="collections-root">
//       <div className="collections-inner">
//         <header className="collections-header">
//           <h1>Our Gallery</h1>
//           <p>Choose a category to explore captured moments.</p>
//         </header>

//         <div className="collections-grid">
//           {COLLECTIONS.map(c => (
//             <Link key={c.id} href={`/gallery/${c.id}`} className="collection-card" aria-label={`Open ${c.title} collection`}>
//               <div className="collection-media">
//                 <Image src={c.img} alt={c.title} fill style={{ objectFit: "cover", objectPosition: "center" }} />
//               </div>
//               <div className="collection-body">
//                 <h3>{c.title}</h3>
//                 <p className="collection-desc">{c.desc}</p>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div className="collections-cta">
//           <Link href="/gallery" className="btn btn--pink">View All Collections</Link>
//         </div>
//       </div>
//     </main>
//   );
// }
