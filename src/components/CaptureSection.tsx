import React from "react";

const CaptureSection: React.FC = () => {
  return (
    <section className="capture-root" aria-labelledby="capture-heading">
      <div className="capture-inner">
        <h2 id="capture-heading" className="capture-title">Ready to capture your moments?</h2>
        <p className="capture-sub">
          Book your session today and let's create timeless memories.
        </p>

        <div className="capture-cta" role="group" aria-label="Call to action">
          <a href="/book" className="btn btn-primary">Book a Session</a>
          <a href="/contact" className="btn btn-outline">Contact Us</a>
        </div>
      </div>
    </section>
  );
};

export default CaptureSection;
