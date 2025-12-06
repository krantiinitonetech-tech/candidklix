"use client";
import React from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

type FormState = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  duration: string;
  guests: string;
  location: string;
  contactMethod: string;
  comments: string;
};

export default function BookingPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    duration: "",
    guests: "",
    location: "",
    contactMethod: "",
    comments: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const text = await res.text(); // capture body for diagnostics
    let json;
    try { json = JSON.parse(text); } catch { json = text; }

    if (!res.ok) {
      console.error("Booking save failed:", res.status, json);
      throw new Error(typeof json === "string" ? json : (json?.error || "Failed to save booking"));
    }

    // optional: still send client EmailJS if needed (or remove if server sends)
    if (process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        form as unknown as Record<string, any>,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      );
    }

    setSuccess("Booking submitted successfully! We’ll contact you soon.");
    setForm({ name:"", email:"", phone:"", eventType:"", eventDate:"", duration:"", guests:"", location:"", contactMethod:"", comments:"" });
  } catch (err: any) {
    console.error("🔥 Booking error:", err);
    setError(err?.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  /* ---------- Inline styles (UI only) ---------- */
  const page = { minHeight: "100vh", background: "#fbf8f6", padding: 28, display: "flex", justifyContent: "center", alignItems: "flex-start" } as const;
  const card = { width: "100%", maxWidth: 900, background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 14px 40px rgba(2,6,23,0.08)" } as const;
  const header = { textAlign: "center", marginBottom: 18 } as const;
  const title = { fontFamily: "var(--font-heading, Georgia)", fontSize: 34, margin: 0, color: "var(--text-heading,#222)" } as const;
  const subtitle = { marginTop: 8, color: "var(--muted,#6f6f6f)" } as const;
  const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } as const;
  const label = { display: "block", marginBottom: 6, color: "var(--muted,#777)", fontSize: 14 } as const;
  const input = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(2,6,23,0.06)", fontSize: 15, boxSizing: "border-box" } as const;
  const textarea = { ...input, minHeight: 110, resize: "vertical" } as const;
  const actionsRow = { display: "flex", gap: 12, marginTop: 18, alignItems: "center" } as const;
  const primary = { flex: 1, background: "linear-gradient(180deg,#f0bfc6,#e7aeb7)", border: 0, padding: "12px 18px", borderRadius: 999, fontWeight: 700, cursor: "pointer" } as const;
  const ghost = { flex: 1, background: "transparent", border: "1px solid rgba(2,6,23,0.08)", padding: "12px 18px", borderRadius: 999, cursor: "pointer" } as const;
  const noteSuccess = { marginTop: 14, textAlign: "center", color: "#157347" } as const;
  const noteError = { marginTop: 14, textAlign: "center", color: "#b02a37" } as const;

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
            <button
              type="button"
              onClick={() => {
                setForm({ name:"", email:"", phone:"", eventType:"", eventDate:"", duration:"", guests:"", location:"", contactMethod:"", comments:"" });
                setError("");
                setSuccess("");
              }}
              style={ghost}
            >
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
