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
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Philosophy2 from "@/components/Philosophy2";

import { Import } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-white text-gray-900">
      <Hero />
      <About />
      <Philosophy />
      <Gallery />
      <section id="services" className="your-services-class">
<Services /></section>
      
      <Philosophy2 />
      <Testimonials />
    </div>
  );
}
