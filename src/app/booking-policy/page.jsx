// server component: src/app/booking/page.jsx
export default function BookingPage() {
  const updated = "December 2025";

  return (
    <main className="terms-root">
      {/* HERO */}
      <header className="terms-hero">
        <div className="container">
          <h1 className="terms-title">Booking Policy</h1>
          <p className="terms-lead">
            Guidelines for booking sessions, deposits, scheduling, package inclusions, and client responsibilities for CandidKlix photography services.
          </p>
          <div className="terms-meta">Last updated: {updated}</div>
        </div>
      </header>

      {/* LAYOUT */}
      <div className="container terms-layout">
        <nav className="terms-toc" aria-label="Booking navigation">
          <strong>On this page</strong>
          <ul>
            <li><a href="#how-to-book">How to book</a></li>
            <li><a href="#availability">Availability & scheduling</a></li>
            <li><a href="#deposit">Deposit & payment</a></li>
            <li><a href="#confirmation">Confirmation & paperwork</a></li>
            <li><a href="#prep">Client preparation</a></li>
            <li><a href="#inclusions">Package inclusions</a></li>
            <li><a href="#extras">Add-ons & travel</a></li>
            <li><a href="#changes">Changes to booking</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <article className="terms-article">
          <section id="how-to-book">
            <h2>How to book</h2>
            <p>
              Bookings can be made via our website booking form, email, or phone. Provide event details, preferred dates/times, and package selection to start the process.
            </p>
          </section>

          <section id="availability">
            <h2>Availability & scheduling</h2>
            <p>
              Dates are held provisionally until a deposit is received. We operate on a first-come, first-served basis; peak-season dates may require earlier booking.
            </p>
          </section>

          <section id="deposit">
            <h2>Deposit & payment</h2>
            <p>
              A non-refundable deposit is required to secure the date. Remaining balance is due according to the package terms (typically before or on the shoot date). We accept bank transfer, UPI, and supported payment providers.
            </p>
          </section>

          <section id="confirmation">
            <h2>Confirmation & paperwork</h2>
            <p>
              Once deposit and paperwork (contract/consent forms) are complete, you will receive a booking confirmation email with invoice and shoot details.
            </p>
          </section>

          <section id="prep">
            <h2>Client preparation</h2>
            <p>
              Clients should review the pre-shoot checklist provided after booking (timings, outfits, permits, shot list). For locations requiring permits, securing permissions is the client's responsibility unless otherwise agreed.
            </p>
          </section>

          <section id="inclusions">
            <h2>Package inclusions</h2>
            <p>
              Each package lists included coverage hours, number of edited images, delivery method, and any prints or albums. Additional services require separate agreement.
            </p>
          </section>

          <section id="extras">
            <h2>Add-ons & travel</h2>
            <p>
              Travel outside the local area may incur travel fees. Add-on services (extra coverage, second shooter, expedited delivery) are available for an additional charge.
            </p>
          </section>

          <section id="changes">
            <h2>Changes to booking</h2>
            <p>
              Requests to change date, time, or scope should be made in writing. Rescheduling is subject to availability and may incur fees per our Cancellation Policy.
            </p>
          </section>

          <section id="contact">
            <h2>Contact</h2>
            <p>For booking questions or to start a booking:</p>
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
