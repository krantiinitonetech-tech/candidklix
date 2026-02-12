"use client";
import Image from "next/image";

const SERVICES = [
  "Wedding photography",
  "Prewedding and couple shoots",
  "Food Photography",
  "Baby shower",
  "Maternity shoots",
  "Birthday parties",
  "Product photography",
  "Graduation parties",
  "All other events and parties",
];

export default function Services() {
  return (
    <section className="services-root">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>

        <div className="services-grid">
          {/* LEFT SIDE */}
          <div className="services-list-card">
            {SERVICES.map((item, index) => (
              <div key={index} className="service-item">
                <span className="arrow">→</span>
                <span className="service-text">{item}</span>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE IMAGES */}
          <div className="services-images">
            <div className="img img-1">
              <Image src="/images/services/1.jpeg" alt="" fill />
            </div>
            <div className="img img-2">
              <Image src="/images/services/2.jpeg" alt="" fill />
            </div>
            <div className="img img-3">
              <Image src="/images/services/3.jpeg" alt="" fill />
            </div>
            <div className="img img-4">
              <Image src="/images/services/4.jpeg" alt="" fill />
            </div>

            {/* Decorative Dots */}
            <div className="dots"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
