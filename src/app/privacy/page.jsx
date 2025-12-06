// server component: src/app/privacy/page.jsx
export default function PrivacyPage() {
  const updated = "December 2025";

  return (
    <main className="terms-root">
      {/* HERO */}
      <header className="terms-hero">
        <div className="container">
          <h1 className="terms-title">Privacy Policy</h1>
          <p className="terms-lead">
            This Policy explains how CandidKlix collects, stores, and uses personal
            information and images during photography services.
          </p>
          <div className="terms-meta">Last updated: {updated}</div>
        </div>
      </header>

      {/* LAYOUT */}
      <div className="container terms-layout">
        <nav className="terms-toc" aria-label="Privacy navigation">
          <strong>On this page</strong>
          <ul>
            <li><a href="#info-we-collect">Information we collect</a></li>
            <li><a href="#how-we-use">How we use your information</a></li>
            <li><a href="#image-storage">Image storage & retention</a></li>
            <li><a href="#third-parties">Sharing with third parties</a></li>
            <li><a href="#client-rights">Client rights</a></li>
            <li><a href="#cookies">Cookies & tracking</a></li>
            <li><a href="#data-security">Data security</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <article className="terms-article">
          {/* SECTION 1 */}
          <section id="info-we-collect">
            <h2>Information we collect</h2>
            <p>
              We collect personal details such as name, contact information, event 
              details, and preferences during the booking process. We also collect 
              images and video footage captured during photography sessions.
            </p>
          </section>

          {/* SECTION 2 */}
          <section id="how-we-use">
            <h2>How we use your information</h2>
            <p>
              Information is used to manage bookings, deliver edited photographs, 
              process payments, and communicate session updates. Images may be used 
              for portfolio or promotional purposes only with your explicit consent.
            </p>
          </section>

          {/* SECTION 3 */}
          <section id="image-storage">
            <h2>Image storage & retention</h2>
            <p>
              Images are securely stored during the editing and delivery period. 
              Unless a long-term storage plan is agreed upon, files may be removed 
              after final delivery. Clients are encouraged to back up their images.
            </p>
          </section>

          {/* SECTION 4 */}
          <section id="third-parties">
            <h2>Sharing with third parties</h2>
            <p>
              We may share data with trusted partners such as print labs, album 
              manufacturers, or cloud delivery services—strictly for fulfilling 
              your order. We never sell personal data.
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="client-rights">
            <h2>Client rights</h2>
            <p>
              You may request access, correction, or deletion of your personal 
              data. You may also withdraw consent for promotional usage of your 
              images at any time.
            </p>
          </section>

          {/* SECTION 6 */}
          <section id="cookies">
            <h2>Cookies & tracking</h2>
            <p>
              Our website may use cookies to improve user experience, remember 
              preferences, and analyze website performance. You can disable 
              cookies in your browser settings.
            </p>
          </section>

          {/* SECTION 7 */}
          <section id="data-security">
            <h2>Data security</h2>
            <p>
              We use secure storage, backups, and restricted access to protect 
              client information and images. However, no digital system is 
              completely risk-free.
            </p>
          </section>

          {/* SECTION 8 */}
          <section id="contact">
            <h2>Contact</h2>
            <p>For questions about this Privacy Policy:</p>
            <address>
              <strong>CandidKlix</strong><br />
              Email: <a href="mailto:hello@candidklix.example">hello@candidklix.example</a><br />
              Phone: <a href="tel:+911234567890">+91 12345 67890</a>
            </address>
          </section>
        </article>
      </div>

      {/* FOOTER */}
      <footer className="terms-foot">
        <div className="container">
          <p>© {new Date().getFullYear()} CandidKlix. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
