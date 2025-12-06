// server component: src/app/cancellation/page.jsx
export default function CancellationPage() {
  const updated = "December 2025";

  return (
    <main className="terms-root">
      <header className="terms-hero">
        <div className="container">
          <h1 className="terms-title">Cancellation Policy</h1>
          <p className="terms-lead">
            Clear terms for cancellations, rescheduling, refunds and no-shows for CandidKlix photography services.
          </p>
          <div className="terms-meta">Last updated: {updated}</div>
        </div>
      </header>

      <div className="container terms-layout">
        <nav className="terms-toc" aria-label="Cancellation navigation">
          <strong>On this page</strong>
          <ul>
            <li><a href="#deposit">Deposit & booking hold</a></li>
            <li><a href="#client-cancel">Client cancellations</a></li>
            <li><a href="#reschedule">Rescheduling</a></li>
            <li><a href="#no-show">No-shows & late starts</a></li>
            <li><a href="#photog-cancel">Photographer cancellations</a></li>
            <li><a href="#force-majeure">Force majeure</a></li>
            <li><a href="#refunds">Refunds & credits</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <article className="terms-article">
          <section id="deposit">
            <h2>Deposit & booking hold</h2>
            <p>
              A deposit is required to reserve your date. The deposit secures the photographer and is applied to the final invoice.
            </p>
          </section>

          <section id="client-cancel">
            <h2>Client cancellations</h2>
            <p>
              Cancellations by the client are subject to the deposit being non-refundable. Cancellations within shorter notice windows
              (specified in your package) may incur additional fees up to the full session price.
            </p>
          </section>

          <section id="reschedule">
            <h2>Rescheduling</h2>
            <p>
              Reschedules are allowed subject to availability. Requests made with at least 14 days' notice are generally accommodated without fee.
              Short-notice reschedules may require an additional charge.
            </p>
          </section>

          <section id="no-show">
            <h2>No-shows & late starts</h2>
            <p>
              If the client fails to appear or causes a late start that reduces the agreed shoot time, additional fees may apply or the session
              may be treated as cancelled with no refund.
            </p>
          </section>

          <section id="photog-cancel">
            <h2>Photographer cancellations</h2>
            <p>
              If CandidKlix must cancel (illness, equipment failure, emergency), we will offer an alternate date or a full refund of fees paid.
            </p>
          </section>

          <section id="force-majeure">
            <h2>Force majeure</h2>
            <p>
              We are not liable for cancellations caused by events beyond control (severe weather, natural disasters, government restrictions).
              In such cases we will attempt to reschedule or issue a refund as appropriate.
            </p>
          </section>

          <section id="refunds">
            <h2>Refunds & credits</h2>
            <p>
              Refunds are processed to the original payment method where possible. Credits for future services may be offered at management's
              discretion in lieu of refunds.
            </p>
          </section>

          <section id="contact">
            <h2>Contact</h2>
            <p>Questions about cancellations or refunds:</p>
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
