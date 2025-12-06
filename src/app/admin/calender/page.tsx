"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebaseConfig";
import LogoutButton from "@/components/logoutButton";
import { onAuthStateChanged } from "firebase/auth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export default function CalendarPage() {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [datesWithNotes, setDatesWithNotes] = useState([]);

  // ✅ Check Authentication
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/admin/login");
      else setAuthReady(true);
    });
    return () => unsub();
  }, [router]);

  // ✅ Load Booked Events
  useEffect(() => {
    if (!authReady) return;

    (async () => {
      const snap = await getDocs(collection(db, "bookings"));
      const list = snap.docs.map((d) => {
        const x = d.data();
        return {
          id: d.id,
          title: `${x.eventType || "Event"} – ${x.name || ""}`,
          start: x.eventDate,
          allDay: true,
          extendedProps: { ...x },
        };
      });
      setEvents(list);
    })();

    loadAllNoteDates(); // show note indicators
  }, [authReady]);

  // ✅ Load all note dates (for indicator dots)
  async function loadAllNoteDates() {
    const snap = await getDocs(collection(db, "calendarNotes"));
    const all = snap.docs.map((d) => d.data().date);
    setDatesWithNotes([...new Set(all)]);
  }

  // ✅ Load notes for a single date
  async function loadNotesForDate(date) {
    try {
      const q = query(
        collection(db, "calendarNotes"),
        where("date", "==", date),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setNotes(list);
    } catch (err) {
      console.error("Error loading notes:", err);
    }
  }

  // ✅ Add note
  async function handleAddNote() {
    if (!noteText.trim() || !selectedDate) return;
    await addDoc(collection(db, "calendarNotes"), {
      date: selectedDate,
      note: noteText.trim(),
      createdAt: new Date().toISOString(),
    });
    setNoteText("");
    await loadNotesForDate(selectedDate);
    await loadAllNoteDates();
  }

  // ✅ Handle Date Click (for adding notes)
  const handleDateClick = (info) => {
    const date = info.dateStr;
    openNotesModal(date);
  };

  // ✅ Handle opening notes modal
  const openNotesModal = async (date) => {
    setSelectedDate(date);
    setShowModal(true);
    await loadNotesForDate(date);
  };

  if (!authReady) {
    return <div className="p-6 text-center">Checking admin permissions…</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">📅 Calendar with Notes</h1>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        
        // 🟦 Click on a booked event → show event details
        eventClick={(info) => {
          const p = info.event.extendedProps;
          alert(`📸 Booking Details

Event: ${info.event.title}
Date: ${info.event.startStr}
Name: ${p.name}
Phone: ${p.phone}
Location: ${p.location}
Guests: ${p.guests}
Duration: ${p.duration}
Contact via: ${p.contactMethod}
Notes: ${p.comments || "None"}
`);
        }}

        dayCellContent={(arg) => {
          const dateStr = arg.date.toISOString().split("T")[0];
          const hasNote = datesWithNotes.includes(dateStr);

          return (
            <div className="flex flex-col items-center text-sm">
              <span>{arg.dayNumberText}</span>
              {hasNote && (
                <span className="w-2 h-2 rounded-full bg-green-500 mt-1"></span>
              )}
              <button
                type="button"
                className="mt-1 text-[10px] bg-blue-100 text-blue-700 px-1 py-[1px] rounded hover:bg-blue-200 focus:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // stop triggering FullCalendar dateClick
                  openNotesModal(dateStr);
                }}
              >
                📝 Note
              </button>
            </div>
          );
        }}
      />

      <LogoutButton />

      {/* ✅ Modal rendered via React Portal */}
      {showModal &&
        createPortal(
          <div
            key={selectedDate}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-2">
                Notes for {selectedDate}
              </h2>

              <div className="border-t pt-3 mb-3">
                <ul className="max-h-40 overflow-y-auto space-y-1">
                  {notes.length === 0 && (
                    <li className="text-gray-400 text-sm">No notes yet</li>
                  )}
                  {notes.map((n) => (
                    <li key={n.id} className="text-gray-700 text-sm">
                      • {n.note}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={handleAddNote}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg w-full hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
