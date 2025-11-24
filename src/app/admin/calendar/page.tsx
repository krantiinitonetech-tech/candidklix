// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth, db } from "@/lib/firebaseConfig";  
// import LogoutButton from "@/components/logoutButton";
// import { onAuthStateChanged } from "firebase/auth";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { collection, getDocs } from "firebase/firestore";

// export default function CalendarPage() {
//   const router = useRouter();

//   // auth state
//   const [authReady, setAuthReady] = useState(false);

//   // calendar state
//   const [events, setEvents] = useState([]);
//   const [totalEvents, setTotalEvents] = useState(0);
//   const [monthEvents, setMonthEvents] = useState(0);

//   // 🔐 PROTECT PAGE
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       if (!user) router.push("/admin/login");
//       else setAuthReady(true);
//     });
//     return () => unsub();
//   }, [router]);

//   // load events data after auth verifies
//   useEffect(() => {
//     if (!authReady) return;

//     (async () => {
//       const snap = await getDocs(collection(db, "bookings"));
//       const list = snap.docs.map((d) => {
//         const x = d.data();
//         return {
//           id: d.id,
//           title: `${x.eventType || "Event"} – ${x.name || ""}`,
//           start: x.eventDate,
//           allDay: true,
//           extendedProps: { ...x },
//         };
//       });

//       setEvents(list);
//       setTotalEvents(list.length);

//       // this month filter count
//       const now = new Date();
//       const month = now.getMonth();
//       const year = now.getFullYear();

//       const thisMonth = list.filter((ev) => {
//         const dt = new Date(ev.start);
//         return dt.getMonth() === month && dt.getFullYear() === year;
//       });

//       setMonthEvents(thisMonth.length);
//     })();
//   }, [authReady]);

//   if (!authReady) {
//     return <div className="p-6 text-center">Checking admin permissions…</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-3">Booked Events Calendar</h1>

//       <div className="flex gap-8 mb-6 text-lg font-medium">
//         <p>Total events: <span className="font-bold text-blue-600">{totalEvents}</span></p>
//         <p>This month: <span className="font-bold text-green-600">{monthEvents}</span></p>
//       </div>

//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         eventClick={(info) => {
//           const p = info.event.extendedProps;
//           alert(`📸 Booking Details

// Event: ${info.event.title}
// Date: ${info.event.startStr}
// Name: ${p.name}
// Phone: ${p.phone}
// Location: ${p.location}
// Guests: ${p.guests}
// Duration: ${p.duration}
// Contact via: ${p.contactMethod}
// Notes: ${p.comments || "None"}
// `);
//         }}
       
//       />

//       <LogoutButton />
//     </div>
//   );
  
// }


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
  updateDoc,
  deleteDoc,
  doc,
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
  const [editNoteId, setEditNoteId] = useState(null);
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

  // ✅ Add / Update note
  async function handleAddOrEditNote() {
    if (!noteText.trim() || !selectedDate) return;

    if (editNoteId) {
      // Update existing note
      const noteRef = doc(db, "calendarNotes", editNoteId);
      await updateDoc(noteRef, { note: noteText.trim() });
      setEditNoteId(null);
    } else {
      // Add new note
      await addDoc(collection(db, "calendarNotes"), {
        date: selectedDate,
        note: noteText.trim(),
        createdAt: new Date().toISOString(),
      });
    }

    setNoteText("");
    await loadNotesForDate(selectedDate);
    await loadAllNoteDates();
  }

  // ✅ Delete note
  async function handleDeleteNote(noteId) {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    await deleteDoc(doc(db, "calendarNotes", noteId));
    await loadNotesForDate(selectedDate);
    await loadAllNoteDates();
  }

  // ✅ Handle Date Click
  const handleDateClick = (info) => {
    const date = info.dateStr;
    setSelectedDate(date);
    setShowModal(true);
    loadNotesForDate(date);
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
                className="mt-1 text-[10px] bg-blue-100 text-blue-700 px-1 py-[1px] rounded hover:bg-blue-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDate(dateStr);
                  setShowModal(true);
                  loadNotesForDate(dateStr);
                }}
              >
                📝 Note
              </button>
            </div>
          );
        }}
      />

      <LogoutButton />

      {/* Render modal outside FullCalendar via portal */}
      {showModal &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => {
              setShowModal(false);
              setEditNoteId(null);
              setNoteText("");
            }}
          >
            <div
              className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-2">
                Notes for {selectedDate}
              </h2>

              <div className="border-t pt-3 mb-3">
                <ul className="max-h-40 overflow-y-auto space-y-2">
                  {notes.length === 0 && (
                    <li className="text-gray-400 text-sm">No notes yet</li>
                  )}
                  {notes.map((n) => (
                    <li
                      key={n.id}
                      className="flex justify-between items-center text-gray-700 text-sm bg-gray-100 px-2 py-1 rounded"
                    >
                      <span>{n.note}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setNoteText(n.note);
                            setEditNoteId(n.id);
                          }}
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNote(n.id)}
                          className="text-red-600 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder={
                      editNoteId ? "Edit selected note..." : "Add a note..."
                    }
                    className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={handleAddOrEditNote}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
                  >
                    {editNoteId ? "Update" : "Add"}
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditNoteId(null);
                  setNoteText("");
                }}
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
