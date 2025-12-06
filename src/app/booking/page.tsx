"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",        // <-- added
    phone: "",
    eventType: "",
    eventDate: "",
    duration: "",
    guests: "",
    location: "",
    contactMethod: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save booking");

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSuccess("Booking submitted successfully! We’ll contact you soon.");
      setForm({
        name: "",
        email: "",      // <-- reset email
        phone: "",
        eventType: "",
        eventDate: "",
        duration: "",
        guests: "",
        location: "",
        contactMethod: "",
        comments: "",
      });
    } catch (err) {
      console.error("🔥 Booking error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Inline styles (UI only) ---------- */
  const page = { minHeight: "100vh", background: "#fbf8f6", padding: 28, display: "flex", justifyContent: "center", alignItems: "flex-start" };
  const card = { width: "100%", maxWidth: 900, background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 14px 40px rgba(2,6,23,0.08)" };
  const header = { textAlign: "center", marginBottom: 18 };
  const title = { fontFamily: "var(--font-heading, Georgia)", fontSize: 34, margin: 0, color: "var(--text-heading,#222)" };
  const subtitle = { marginTop: 8, color: "var(--muted,#6f6f6f)" };
  const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
  const label = { display: "block", marginBottom: 6, color: "var(--muted,#777)", fontSize: 14 };
  const input = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(2,6,23,0.06)", fontSize: 15, boxSizing: "border-box" };
  const textarea = { ...input, minHeight: 110, resize: "vertical" };
  const actionsRow = { display: "flex", gap: 12, marginTop: 18, alignItems: "center" };
  const primary = { flex: 1, background: "linear-gradient(180deg,#f0bfc6,#e7aeb7)", border: 0, padding: "12px 18px", borderRadius: 999, fontWeight: 700, cursor: "pointer" };
  const ghost = { flex: 1, background: "transparent", border: "1px solid rgba(2,6,23,0.08)", padding: "12px 18px", borderRadius: 999, cursor: "pointer" };
  const noteSuccess = { marginTop: 14, textAlign: "center", color: "#157347" };
  const noteError = { marginTop: 14, textAlign: "center", color: "#b02a37" };

  return (
    <div style={page}>
      <form style={card} onSubmit={handleSubmit} aria-labelledby="booking-heading" noValidate>
        <header style={header}>
          <h1 id="booking-heading" style={title}>Candid Klix — Quote Request</h1>
          <p style={subtitle}>Fill out the form and we’ll email an estimated quote and availability.</p>
        </header>

        <div style={{ display: "grid", gap: 12 }}>
          <div style={grid2}>
            <div>
              <label style={label}>Your Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required style={input} />
            </div>

            <div>
              <label style={label}>Email</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@domain.com" style={input} />
            </div>
          </div>

          <div style={grid2}>
            <div>
              <label style={label}>Phone Number *</label>
              <input name="phone" value={form.phone} onChange={handleChange} required style={input} />
            </div>

            <div>
              <label style={label}>Event Type *</label>
              <input name="eventType" value={form.eventType} onChange={handleChange} required style={input} />
            </div>
          </div>

          <div style={grid2}>
            <div>
              <label style={label}>Event Date *</label>
              <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} required style={input} />
            </div>

            <div>
              <label style={label}>Duration</label>
              <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 4 hours" style={input} />
            </div>
          </div>

          <div style={grid2}>
            <div>
              <label style={label}>No. of Guests</label>
              <input name="guests" value={form.guests} onChange={handleChange} type="number" min="0" style={input} />
            </div>

            <div>
              <label style={label}>&nbsp;</label>
              <div />
            </div>
          </div>

          <div>
            <label style={{ ...label, marginBottom: 8 }}>Location *</label>
            <input name="location" value={form.location} onChange={handleChange} required style={input} />
          </div>

          <div>
            <label style={label}>Additional Comments</label>
            <textarea name="comments" value={form.comments} onChange={handleChange} style={textarea} />
          </div>

          <div style={actionsRow}>
            <button type="submit" disabled={loading} style={primary}>
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
            <button type="button" onClick={() => { setForm({ name:"", email:"", phone:"", eventType:"", eventDate:"", duration:"", guests:"", location:"", contactMethod:"", comments:"" }); setError(""); setSuccess(""); }} style={ghost}>
              Reset
            </button>
          </div>

          {success && <div role="status" style={noteSuccess}>{success}</div>}
          {error && <div role="alert" style={noteError}>{error}</div>}
        </div>
      </form>
    </div>
  );
}
