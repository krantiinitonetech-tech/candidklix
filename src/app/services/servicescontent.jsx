// app/services/servicescontent.jsx
"use client";
import React from "react";
import Link from "next/link";

export default function ServicesContent() {
  return (
    <main>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="breadcrumb" style={{ padding: "12px 20px" }}>
        <Link href="/">Home</Link> <span style={{ margin: "0 8px" }}>›</span> <span>Services</span>
      </nav>

      {/* Page header
      <header className="page-header" style={{ textAlign: "center", padding: "36px 20px 8px" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "44px", margin: 0, color: "var(--text-heading)" }}>
          Our Services
        </h1>
        <p style={{ marginTop: 12, color: "var(--muted)" }}>
          Authentic storytelling photography — tailored for every occasion.
        </p>
      </header> */}

      {/* Optional intro / hero band */}
      {/* <section className="services-why" style={{ maxWidth: 1100, margin: "28px auto 48px", padding: "0 20px" }}>
        <p style={{ textAlign: "center", color: "var(--muted)", marginBottom: 0 }}>
          We offer a variety of photography packages and bespoke sessions — click a card below to view that gallery or book a session.
        </p>
      </section> */}
    </main>
  );
}
