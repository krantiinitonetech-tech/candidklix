import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin.server";

export async function POST(req) {
  try {
    const body = await req.json();

    // 🧠 Basic validation
    const requiredFields = ["name", "phone", "eventType", "eventDate", "duration", "location"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required.` }, { status: 400 });
      }
    }

    // 🕓 Add timestamp
    const newBooking = {
      ...body,
      createdAt: new Date().toISOString(),
    };

    // 💾 Save booking in Firestore
    await adminDb.collection("bookings").add(newBooking);

    // 💌 Send EmailJS notification
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // service_id: service_agjf4mh,
        // template_id:"template_h38gjp9",
        // user_id:"9mmaAI2_1HbHhT1Ec",
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

    if (!res.ok) {
      console.warn("EmailJS failed:", await res.text());
    }

    return NextResponse.json({ success: true, message: "Booking submitted successfully!" });
  } catch (error) {
    console.error("🔥 Booking submission error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
