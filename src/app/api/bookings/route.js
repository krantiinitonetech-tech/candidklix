import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin.server";

export async function POST(req) {
  try {
    const body = await req.json();

    const requiredFields = ["name", "phone", "eventType", "eventDate", "duration", "location"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required.` }, { status: 400 });
      }
    }

    if (!adminDb) {
      console.error("adminDb is not initialized");
      return NextResponse.json({ error: "Server DB not configured" }, { status: 500 });
    }

    const newBooking = { ...body, createdAt: new Date().toISOString() };

    // Save booking
    try {
      await adminDb.collection("bookings").add(newBooking);
    } catch (saveErr) {
      console.error("Firestore save error:", saveErr);
      return NextResponse.json({ error: "Failed to save booking to DB" }, { status: 500 });
    }

    // Send Email via EmailJS (server-side)
    try {
      const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          template_params: {
            name: newBooking.name,
            phone: newBooking.phone,
            eventType: newBooking.eventType,
            eventDate: newBooking.eventDate,
            duration: newBooking.duration,
            guests: newBooking.guests || "Not specified",
            location: newBooking.location,
            contactMethod: newBooking.contactMethod || "Not specified",
            comments: newBooking.comments || "None",
          },
        }),
      });

      if (!emailRes.ok) {
        const t = await emailRes.text();
        console.warn("EmailJS failed:", emailRes.status, t);
      }
    } catch (emailErr) {
      console.warn("EmailJS request error:", emailErr);
    }

    return NextResponse.json({ success: true, message: "Booking submitted successfully!" }, { status: 201 });
  } catch (error) {
    console.error("🔥 Booking submission error:", error);
    const msg = error?.message || "Unknown server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
