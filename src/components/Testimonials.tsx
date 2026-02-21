"use client";
import React, { useState } from "react";
import Image from "next/image";

const TESTIMONIALS = [
   {
    name: "Nimesh & Hiral Parekh",
    image: "/images/testimonials/test2.png",
    text: `If you’re overwhelmed with choices, our advice is simple — stop searching. Pradeep and Vinay are the team you want.
From our son’s wedding to every celebration that followed, their photos and films were beautifully timed and thoughtfully captured.
They were clear, communicative, fun, and professional while still feeling like family. We couldn’t have asked for a better experience.`,
  },
  
  {
    name: "Ganesh & Neelima",
    image: "/images/testimonials/test1.png",
    text: `From the very beginning, Pradeep and his team made us feel we were in the best hands. They were incredibly flexible through every change and delay, never once making us feel rushed on our special day.
They even stayed longer than planned, simply to ensure every moment we hoped for was beautifully captured. Pradeep and the team’s kindness, patience, and professionalism made the entire experience seamless and stress-free.
We are truly grateful for their dedication and care, and we cannot wait to relive our day through the final photos and films. We wholeheartedly recommend Candid Klix to any couple looking for a team that genuinely goes the extra mile to capture every moment with heart and elegance.`,
  },
 
  {
    name: "Sonia Khurmi",
    image: "/images/testimonials/test3.png",
    text: `Celebrating my daughter’s birthday and graduation was more than just an event — it was a milestone we wanted to cherish forever.
Pradeep didn’t just take photos; he truly listened and captured every request beautifully.
His flexibility allowed us to be present in the moment, making everything stress-free and enjoyable.`,
  },
  {
    name: "Abha Negi",
    image: "/images/testimonials/test4.png",
    text: `For our baby’s first birthday celebration, Vinay’s dedication was remarkable.
Despite difficult weather conditions, he arrived right on time and stayed until the very end.
He captured every amazing moment, giving us priceless memories forever.`,
  },
  {
    name: "Uzma & Family",
    image: "/images/testimonials/test5.png",
    text: `Pradeep is not just a skilled artist; he is a genuinely fantastic person to work with.
He put us at ease and ensured every family member felt comfortable.
We are grateful not just for the results, but for the experience he created.`,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const next = () =>
    setIndex((i) => (i + 1) % TESTIMONIALS.length);

  const current = TESTIMONIALS[index];

  return (
    <section className="testimonials-root">
      <div className="testimonials-container">
        <h2 className="testimonials-title">Happy Notes</h2>

        <div className="testimonial-slide">
          <div className="testimonial-image">
            <Image
              src={current.image}
              alt={current.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="testimonial-card">
            <p>{current.text}</p>
            <h4>{current.name}</h4>
          </div>
        </div>

        <div className="testimonial-arrows">
          <button onClick={prev}>‹</button>
          <button onClick={next}>›</button>
        </div>
      </div>
    </section>
  );
}













// "use client";
// import React from "react";
// import Image from "next/image";

// type Testimonial = {
//   id: string;
//   quote: string;
//   name: string;
//   role: string;
//   avatar: string; // e.g. /images/testimonials/sarah.jpg
//   tone: "tone-rose" | "tone-blue" | "tone-violet" | "tone-peach";
//   ring: "ring-rose" | "ring-blue" | "ring-violet" | "ring-peach";
// };

// const TESTIMONIALS: Testimonial[] = [
//   {
//     id: "t1",
//     quote:
//       "CandidKlix captured our wedding day beautifully. Every photo tells our story with such warmth and elegance. We couldn't be happier!",
//     name: "Sarah & Michael",
//     role: "Wedding Clients",
//     avatar: "/images/testimonials/sarah.jpg",
//     tone: "tone-rose",
//     ring: "ring-rose",
//   },
//   {
//     id: "t2",
//     quote:
//       "The team made me feel so comfortable during my maternity shoot. The photos are absolutely stunning and I’ll treasure them forever.",
//     name: "Emily Thompson",
//     role: "Baby Shower Client",
//     avatar: "/images/testimonials/emily.jpg",
//     tone: "tone-blue",
//     ring: "ring-blue",
//   },
//   {
//     id: "t3",
//     quote:
//       "Professional, creative, and attentive to detail. My graduation photos turned out perfect and truly capture this milestone moment.",
//     name: "David Chen",
//     role: "Graduation Client",
//     avatar: "/images/testimonials/david.jpg",
//     tone: "tone-violet",
//     ring: "ring-violet",
//   },
//   {
//     id: "t4",
//     quote:
//       "CandidKlix elevated our menu with gorgeous food photography. Their artistic eye made our dishes look irresistible!",
//     name: "Bella's Bistro",
//     role: "Restaurant Client",
//     avatar: "/images/testimonials/bella.jpg",
//     tone: "tone-peach",
//     ring: "ring-peach",
//   },
// ];

// export default function Testimonials(): React.ReactElement {
//   return (
//     <section aria-labelledby="testimonials-heading" className="testimonials-root">
//       <div className="testimonials-inner">
//         <header className="testimonials-header">
//           <h2 id="testimonials-heading">What Our Clients Say</h2>
//           <p className="testimonials-sub">Hear from those who've trusted us with their precious moments</p>
//         </header>

//         <ul className="testimonials-grid" role="list">
//           {TESTIMONIALS.map((t) => (
//             <li key={t.id} className={`testimonial-card ${t.ring}`}>
//               <div className={`testimonial-body ${t.tone}`}>
//                 <div className="quote-mark" aria-hidden>
//                   {/* decorative quote glyph */}
//                   <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
//                     <path d="M7 7h3v6H5V9a2 2 0 012-2zm9 0h3v6h-5V9a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>

//                 <blockquote className="testimonial-quote">“{t.quote}”</blockquote>

//                 <div className="testimonial-meta">
//                   <div className="avatar-wrap" aria-hidden>
//                     <Image src={t.avatar} alt={t.name} width={56} height={56} className="avatar" />
//                   </div>
//                   <div className="meta-text">
//                     <div className="meta-name">{t.name}</div>
//                     <div className="meta-role">{t.role}</div>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }
