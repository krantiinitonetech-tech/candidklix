import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin.server";

// GET all notes
export async function GET() {
  const snap = await adminDb.collection("calendarNotes").get();
  return NextResponse.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
}

// UPSERT note by date
export async function POST(req) {
  const { date, note } = await req.json();
  if (!date || !note?.trim()) return NextResponse.json({ error: "date & note required" }, { status: 400 });

  const q = await adminDb.collection("calendarNotes").where("date", "==", date).limit(1).get();
  const payload = { date, note: note.trim(), updatedAt: new Date().toISOString() };

  if (!q.empty) {
    await adminDb.collection("calendarNotes").doc(q.docs[0].id).update(payload);
  } else {
    await adminDb.collection("calendarNotes").add({ ...payload, createdAt: new Date().toISOString() });
  }
  return NextResponse.json({ success: true });
}
