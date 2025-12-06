"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

/**
 * Contact page (client)
 * - posts to /api/bookings with eventType:"contact"
 * - then calls EmailJS (same service/template used by booking)
 *
 * Expects env vars:
 * NEXT_PUBLIC_EMAILJS_SERVICE
 * NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT (or NEXT_PUBLIC_EMAILJS_TEMPLATE)
 * NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
 */

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function updateField(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!form.name || !form.email) {
      setMessage("Please enter your name and email.");
      return;
    }

    setLoading(true);
    try {
      // 1) Persist on server - server route will detect contact/booking via eventType
      const payload = { ...form, eventType: "contact" };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errText = "Failed to save contact";
        try {
          const json = await res.json();
          if (json?.error) errText = json.error;
        } catch {}
        throw new Error(errText);
      }

      // 2) Send EmailJS notification (client)
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE;
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT ||
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        name: form.name,
        email: form.email,
        phone: form.phone || "—",
        message: form.comments || "—",
      };

      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        console.warn("EmailJS env vars missing; skipping client notification.");
      }

      setMessage("Thanks — your message was submitted. We'll be in touch soon.");
      setForm({ name: "", email: "", phone: "", comments: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      setMessage(err?.message || "Submission failed — please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Inline styles
  const styles = {
    root: {
      padding: "64px 20px",
      background: "var(--cream-bg, #fbf6f2)",
      fontFamily:
        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      color: "var(--text-heading, #333)",
    },
    container: {
      maxWidth: 880,
      margin: "0 auto",
      textAlign: "center",
    },
    header: {
      fontFamily: "var(--font-heading, Georgia, 'Times New Roman', serif)",
      fontSize: 40,
      marginBottom: 8,
    },
    sub: {
      color: "var(--muted, #6b6b6b)",
      marginBottom: 30,
    },
    form: {
      marginTop: 24,
      background: "white",
      padding: 28,
      borderRadius: 12,
      boxShadow: "0 12px 30px rgba(2,6,23,0.06)",
      textAlign: "left",
    },
    row: { display: "flex", gap: 12, marginBottom: 12 },
    col: { flex: 1 },
    label: { display: "block", fontSize: 13, marginBottom: 6, color: "#444" },
    input: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: 8,
      border: "1px solid rgba(2,6,23,0.06)",
      fontSize: 15,
      outline: "none",
      boxSizing: "border-box",
      background: "rgba(230,240,255,0.3)",
    },
    textarea: {
      width: "100%",
      minHeight: 120,
      padding: "12px 14px",
      borderRadius: 8,
      border: "1px solid rgba(2,6,23,0.06)",
      fontSize: 15,
      resize: "vertical",
      boxSizing: "border-box",
    },
    actions: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginTop: 18,
    },
    btnPrimary: {
      background: "var(--pink-600, #e8b8bd)",
      border: "none",
      padding: "12px 20px",
      borderRadius: 999,
      cursor: "pointer",
      fontWeight: 700,
    },
    btnSecondary: {
      background: "transparent",
      border: "1px solid rgba(2,6,23,0.06)",
      padding: "10px 18px",
      borderRadius: 999,
      cursor: "pointer",
    },
    note: { color: "#444", marginTop: 8 },
    message: { marginTop: 16, color: "#6b6b6b" },
  };

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <h1 style={styles.header}>Contact</h1>
        <p style={styles.sub}>
          Send a quick message — we’ll respond with availability and next steps.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label} htmlFor="name">
                Your name *
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={updateField}
                style={styles.input}
                placeholder="Jane Doe"
                required
              />
            </div>

            <div style={styles.col}>
              <label style={styles.label} htmlFor="email">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                style={styles.input}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={styles.label} htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={updateField}
              style={styles.input}
              placeholder="+1 (555) 555-5555"
            />
          </div>

          <div>
            <label style={styles.label} htmlFor="comments">
              Message
            </label>
            <textarea
              id="comments"
              name="comments"
              value={form.comments}
              onChange={updateField}
              style={styles.textarea}
              placeholder="How can we help? Tell us about your event or question."
            />
          </div>

          <div style={styles.actions}>
            <button type="submit" style={styles.btnPrimary} disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </button>

            <button
              type="button"
              style={styles.btnSecondary}
              onClick={() => setForm({ name: "", email: "", phone: "", comments: "" })}
            >
              Clear
            </button>

            <div style={{ marginLeft: "auto", fontSize: 13, color: "#888" }}>
              <div style={{ fontWeight: 600 }}>We reply within 24 hours</div>
              <div style={{ color: "#aaa", fontSize: 12 }}>
                You’ll get a confirmation email shortly.
              </div>
            </div>
          </div>

          {message && <div style={styles.message}>{message}</div>}
        </form>
      </div>
    </div>
  );
}
