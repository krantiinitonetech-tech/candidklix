// app/services/page.jsx
import React from "react";
import ServicesContent from "./servicescontent";
import ServicesShowcase from "@/components/ServicesShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import CaptureSection from '@/components/CaptureSection';
import Breadcrumb from "@/components/Breadcrumb";



export const metadata = {
  title: "Services - CandidKlix",
  description: "Our photography services — weddings, baby showers, graduations, food and more."
};

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ href: "/services", label: "Services" }]} />
      <ServicesContent />
      <ServicesShowcase />
      <WhyChooseUs />
      <CaptureSection />
    </>
  );
}
