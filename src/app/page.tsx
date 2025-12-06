// src/app/page.tsx
export const metadata = {
  title: "CandidKlix — Capture Life's Greatest Moments",
  description:
    "CandidKlix — wedding, baby-shower, graduation and food photography. Book your session and view curated galleries.",
};

import Link from "next/link";
import React from "react";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";


export default function HomePage(): JSX.Element {
  return (
    <div className="bg-white text-gray-900">
      {/* ===== HERO (moved to component for pixel-perfect Figma mapping) ===== */}
      <Hero />
      <About />
      <Services />
      <Gallery /> 
      <Testimonials />
      {/* ===== MAIN ===== */}
 
    </div>
  );
}
