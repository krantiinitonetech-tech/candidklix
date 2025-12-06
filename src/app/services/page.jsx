// app/services/page.jsx
import React from "react";
import ServicesContent from "./servicescontent";
import ServicesShowcase from "@/components/ServicesShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import CaptureSection from '@/components/CaptureSection';

export const metadata = {
  title: "Services - CandidKlix",
  description: "Our photography services — weddings, baby showers, graduations, food and more."
};

export default function Page() {
  return (
    <>
      <ServicesContent />
      <ServicesShowcase />
      <WhyChooseUs />
      <CaptureSection />
    </>
  );
}
