// server component: src/app/terms/page.jsx
export default function TermsPage() {
  const updated = "December 2025";

  return (
    <main className="terms-root">
      <header className="terms-hero">
        <div className="container">
          <h1 className="terms-title">Terms & Conditions</h1>
          <p className="terms-lead">
            These Terms govern bookings, use of services, payments, image rights, and liability for photography services provided by CandidKlix.
          </p>
          <div className="terms-meta">Last updated: {updated}</div>
        </div>
      </header>

      <div className="container terms-layout">
        <nav className="terms-toc" aria-label="Terms navigation">
          <strong>On this page</strong>
          <ul>
            <li><a href="#booking">Booking & confirmation</a></li>
            <li><a href="#payments">Payments</a></li>
            <li><a href="#cancellations">Cancellations & rescheduling</a></li>
            <li><a href="#deliverables">Deliverables & timeline</a></li>
            <li><a href="#copyright">Copyright & usage</a></li>
            <li><a href="#liability">Liability & limits</a></li>
            <li><a href="#privacy">Privacy & data</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <article className="terms-article">
          <section id="booking">
            <h2>Booking & confirmation</h2>
            <p>Bookings are confirmed only after receiving the required deposit and a written confirmation from CandidKlix. Dates are reserved on a first-come, first-served basis.</p>
          </section>

          <section id="payments">
            <h2>Payments</h2>
            <p>A non-refundable deposit is required to secure a booking. Final balance is due per the package terms (typically before or on the shoot date). We accept bank transfer, UPI or supported payment providers.</p>
          </section>

          <section id="cancellations">
            <h2>Cancellations & rescheduling</h2>
            <p>Deposits are non-refundable. Requests to reschedule are subject to availability; short-notice reschedules may incur a fee. If CandidKlix must cancel due to emergency, a full refund or alternate date will be offered.</p>
          </section>

          <section id="deliverables">
            <h2>Deliverables & timeline</h2>
            <p>Standard delivery windows are noted in your package: typically 2–4 weeks for portrait sessions and 4–8 weeks for weddings/events. Albums and prints may have additional lead times.</p>
          </section>

          <section id="copyright">
            <h2>Copyright & usage</h2>
            <p>All images are protected by copyright owned by CandidKlix unless otherwise assigned in writing. Clients receive a personal usage license for sharing and printing. Commercial usage requires a separate license.</p>
          </section>

          <section id="liability">
            <h2>Liability & limits</h2>
            <p>CandidKlix's liability is limited to the total amount paid for the session. We are not liable for indirect losses, missed opportunities due to circumstances beyond our control, or third-party actions. We use backup equipment to reduce risk of loss.</p>
          </section>

          <section id="privacy">
            <h2>Privacy & data</h2>
            <p>We handle personal data as described in our Privacy Policy. Images are stored temporarily for delivery; long-term archiving is the responsibility of the client unless a storage agreement exists.</p>
          </section>

          <section id="contact">
            <h2>Contact</h2>
            <p>Questions about these Terms can be sent to:</p>
            <address>
              <strong>CandidKlix</strong><br />
              Email: <a href="mailto:hello@candidklix.example">hello@candidklix.example</a><br />
              Phone: <a href="tel:+911234567890">+91 12345 67890</a>
            </address>
          </section>
        </article>
      </div>

      <footer className="terms-foot">
        <div className="container">
          <p>© {new Date().getFullYear()} CandidKlix. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
