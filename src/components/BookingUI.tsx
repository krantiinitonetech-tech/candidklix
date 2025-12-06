// components/BookingUI.tsx
"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

type FormShape = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  duration: string;
  guests: string;
  location: string;
  contactMethod: string;
  notes: string;
};

export default function BookingUI() {
  const [form, setForm] = useState<FormShape>({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    date: "",
    duration: "",
    guests: "",
    location: "",
    contactMethod: "phone",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  function update<K extends keyof FormShape>(k: K, v: string) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // 1) Save booking server-side
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save booking");

      // 2) Send notification via EmailJS (browser)
      // Ensure these env vars are set in .env.local and available at build time:
      // NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        {
          ...form,
          // map any template params you need, e.g.:
          from_name: form.name,
          from_phone: form.phone,
          from_email: form.email,
          event_type: form.eventType,
          event_date: form.date,
          location: form.location,
          notes: form.notes,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
      );

      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        date: "",
        duration: "",
        guests: "",
        location: "",
        contactMethod: "phone",
        notes: "",
      });
    } catch (err) {
      console.error("Booking submit error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="booking-root">
      <div className="booking-inner">
        <header className="booking-header">
          <h1>Book a Session</h1>
          <p>Fill the form below and we'll get back with availability & an estimated quote.</p>
        </header>

        <form className="booking-form" onSubmit={onSubmit}>
          <div className="row">
            <label>
              <span>Your name *</span>
              <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </label>

            <label>
              <span>Phone number *</span>
              <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
            </label>
          </div>

          <div className="row">
            <label>
              <span>Email</span>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </label>

            <label>
              <span>Event type *</span>
              <select value={form.eventType} onChange={(e) => update("eventType", e.target.value)} required>
                <option value="">Choose</option>
                <option>Wedding</option>
                <option>Baby Shower</option>
                <option>Graduation</option>
                <option>Food Photography</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <div className="row">
            <label>
              <span>Date</span>
              <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
            </label>

            <label>
              <span>Duration (hours)</span>
              <input type="number" min={1} value={form.duration} onChange={(e) => update("duration", e.target.value)} />
            </label>
          </div>

          <div className="row">
            <label>
              <span>No. of guests</span>
              <input type="number" min={0} value={form.guests} onChange={(e) => update("guests", e.target.value)} />
            </label>

            <label>
              <span>Location *</span>
              <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} required />
            </label>
          </div>

          <div className="row contact-method">
            <fieldset>
              <legend>Preferred contact method</legend>
              <label>
                <input type="radio" name="cm" checked={form.contactMethod === "phone"} onChange={() => update("contactMethod", "phone")} /> Phone
              </label>
              <label>
                <input type="radio" name="cm" checked={form.contactMethod === "email"} onChange={() => update("contactMethod", "email")} /> Email
              </label>
            </fieldset>
          </div>

          <label className="full">
            <span>Additional comments</span>
            <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={5} />
          </label>

          <div className="actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Submit Booking"}
            </button>
            <button type="button" className="btn-ghost" onClick={() => {
              setForm({
                name: "",
                phone: "",
                email: "",
                eventType: "",
                date: "",
                duration: "",
                guests: "",
                location: "",
                contactMethod: "phone",
                notes: "",
              });
              setStatus(null);
            }}>
              Reset
            </button>
          </div>

          {status === "success" && <p className="notice success">Thanks — we received your request. We’ll contact you shortly.</p>}
          {status === "error" && <p className="notice error">Something went wrong. Please try again later.</p>}
        </form>
      </div>
    </section>
  );
}
