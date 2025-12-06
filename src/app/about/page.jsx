"use client";

export default function AboutPage() {
  return (
    <main className="about-root">

      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <h1>We tell stories through candid moments</h1>
          <p className="lead">
            At CandidKlix, we believe that the most beautiful photographs are those
            that capture genuine emotion and authentic connection. Our documentary-style
            approach preserves the natural flow of your special moments, creating timeless
            memories that tell your unique story.
          </p>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="about-approach">
        <div className="container grid-2">
          <div className="approach-text">
            <h2>Our Approach</h2>
            <p>
              We practice a gentle, unobtrusive style of photography that allows your
              day to unfold naturally. Rather than staging every shot, we document the
              authentic emotions, spontaneous laughter, and tender moments that make
              your story uniquely yours.
            </p>
            <p>
              Every couple, every family, every celebration has its own rhythm and
              personality. We take the time to understand your vision, your relationships,
              and what matters most to you. This personalized approach ensures that your
              photographs reflect not just how things looked, but how they felt.
            </p>
          </div>

          <aside className="approach-card tone-rose">
            <div className="icon-wrap">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h3l2-2h6l2 2h3v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z"
                  stroke="#FFEFF1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="13" r="3"
                  stroke="#FFEFF1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>CandidKlix</h3>
            <p className="muted">Where Moments Become Memories</p>
          </aside>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="about-why">
        <div className="container">
          <header className="why-header">
            <h2>Why Clients Choose CandidKlix</h2>
            <p className="lead muted">Excellence in every detail, authenticity in every frame</p>
          </header>

          <div className="features-grid">

            <article className="feature-card tone-rose">
              <div className="feature-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14" stroke="#FFDCE0" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M5 12h14" stroke="#FFDCE0" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <h4>Personal Attention</h4>
              <p>Every client receives dedicated care and customized service tailored to their unique needs.</p>
            </article>

            <article className="feature-card tone-blue">
              <div className="feature-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#EAF5FF" strokeWidth="1.6"/>
                  <path d="M12 8v5l3 2" stroke="#EAF5FF" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <h4>Reliable Delivery</h4>
              <p>Timely delivery of beautifully edited images you can count on.</p>
            </article>

            <article className="feature-card tone-violet">
              <div className="feature-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path d="M12 7l.01 0" stroke="#F2EAF8" strokeWidth="1.6"/>
                  <path d="M9 12h6" stroke="#F2EAF8" strokeWidth="1.6"/>
                </svg>
              </div>
              <h4>Cinematic Editing</h4>
              <p>Soft, timeless tones with natural color grading and professional retouching.</p>
            </article>

            <article className="feature-card tone-peach">
              <div className="feature-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4v16" stroke="#FFEFE6" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M6 8h12" stroke="#FFEFE6" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <h4>Professional Expertise</h4>
              <p>Years of artistic experience dedicated to capturing your most meaningful moments.</p>
            </article>

          </div>
        </div>
      </section>

      {/* CSS */}
      <style jsx>{`
        .about-root { color: var(--text-body); }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* HERO */
        .about-hero {
          background: var(--cream-bg);
          padding: 64px 0 48px;
          text-align: center;
        }
        .about-hero h1 {
          font-family: var(--font-heading);
          font-size: 48px;
          margin: 0 0 12px;
          color: var(--text-heading);
        }
        .about-hero .lead {
          max-width: 820px;
          margin: 0 auto;
          color: var(--muted);
        }

        /* APPROACH */
        .about-approach { padding: 48px 0; }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: center;
        }
        @media(min-width: 880px) {
          .grid-2 {
            grid-template-columns: 1fr 420px;
          }
        }

        .approach-text h2 {
          font-family: var(--font-heading);
          font-size: 32px;
          margin-bottom: 12px;
          color: var(--text-heading);
        }
        .approach-text p {
          line-height: 1.7;
          margin-bottom: 12px;
        }

        .approach-card {
          border-radius: var(--card-radius, 12px);
          padding: 36px 28px;
          box-shadow: 0 18px 40px rgba(2,6,23,0.06);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .approach-card h3 {
          font-family: var(--font-heading);
          margin-top: 10px;
          color: var(--text-heading);
        }
        .approach-card .muted {
          color: var(--muted);
          font-size: 14px;
        }

        /* WHY CHOOSE */
        .about-why {
          padding: 48px 0 80px;
        }
        .why-header {
          text-align: center;
          margin-bottom: 28px;
        }
        .why-header h2 {
          font-family: var(--font-heading);
          font-size: 36px;
          color: var(--text-heading);
        }
        .why-header .lead {
          color: var(--muted);
        }

        .features-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr;
        }
        @media(min-width: 720px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media(min-width: 1100px) {
          .features-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .feature-card {
          border-radius: 14px;
          padding: 28px;
          box-shadow: 0 18px 40px rgba(2,6,23,0.06);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        .tone-rose { background: rgba(255,220,223,0.92); }
        .tone-blue { background: rgba(229,239,249,0.96); }
        .tone-violet { background: rgba(242,235,252,0.96); }
        .tone-peach { background: rgba(252,235,228,0.96); }

        .feature-card h4 {
          font-family: var(--font-heading);
          margin: 0;
          color: var(--text-heading);
        }
        .feature-card p {
          margin: 0;
          line-height: 1.6;
          color: var(--text-body);
          font-size: 14px;
        }

        @media(max-width: 640px) {
          .about-hero h1 { font-size: 32px; }
          .approach-card { padding: 24px; }
          .feature-card { padding: 20px; }
        }
      `}</style>
    </main>
  );
}
