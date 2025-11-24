// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth, db } from "@/lib/firebaseConfig";  
// import LogoutButton from "@/components/logoutButton";
// import { onAuthStateChanged } from "firebase/auth";
// import Full  from "@fullcalendar/react";
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

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth, db } from "@/lib/firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { collection, getDocs } from "firebase/firestore";
// import LogoutButton from "@/components/LogoutButton";

// export default function CalendarPage() {
//   const router = useRouter();

//   // auth
//   const [authReady, setAuthReady] = useState(false);

//   // data
//   const [events, setEvents] = useState([]);
//   const [totalEvents, setTotalEvents] = useState(0);
//   const [monthEvents, setMonthEvents] = useState(0);

//   // notes modal
//   const [showModal, setShowModal] = useState(false);
//   const [noteDate, setNoteDate] = useState("");   // "YYYY-MM-DD"
//   const [noteText, setNoteText] = useState("");   // text

//   // protect page
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => (!user ? router.push("/admin/login") : setAuthReady(true)));
//     return () => unsub();
//   }, [router]);

//   // load bookings + notes
//   useEffect(() => {
//     if (!authReady) return;
//     (async () => {
//       // bookings
//       const snap = await getDocs(collection(db, "bookings"));
//       const bookingEvents = snap.docs.map((d) => {
//         const x = d.data();
//         return {
//           id: d.id,
//           title: `${x.eventType || "Event"} – ${x.name || ""}`,
//           start: x.eventDate, // ISO
//           allDay: true,
//           extendedProps: { ...x, kind: "booking" },
//         };
//       });

//       // notes
//       const res = await fetch("/api/calendarNotes", { cache: "no-store" });
//       const notes = await res.json(); // [{date, note}]
//       const noteEvents = notes.map((n) => ({
//         id: `note-${n.date}`,
//         title: `Note: ${n.note}`,
//         start: n.date,
//         allDay: true,
//         // style notes differently
//         backgroundColor: "transparent",
//         borderColor: "transparent",
//         textColor: "#eab308", // amber-500
//         classNames: ["note-event"],
//         extendedProps: { kind: "note", raw: n },
//       }));

//       // merge (notes first) to show above bookings
//       const merged = [...noteEvents, ...bookingEvents];
//       setEvents(merged);
//       setTotalEvents(bookingEvents.length);

//       // month count (bookings only)
//       const now = new Date();
//       const m = now.getMonth(), y = now.getFullYear();
//       setMonthEvents(
//         bookingEvents.filter((ev) => {
//           const dt = new Date(ev.start);
//           return dt.getMonth() === m && dt.getFullYear() === y;
//         }).length
//       );
//     })();
//   }, [authReady]);

//   // open modal on date click
//   async function handleDateClick(info) {
//     const dateISO = info.dateStr; // YYYY-MM-DD
//     setNoteDate(dateISO);

//     // fetch existing note for this date (from already loaded events)
//     const existing = events.find((e) => e.extendedProps?.kind === "note" && e.start === dateISO);
//     setNoteText(existing ? existing.extendedProps.raw.note : "");
//     setShowModal(true);
//   }

//   // save note (upsert)
//   async function saveNote() {
//     const r = await fetch("/api/calendarNotes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ date: noteDate, note: noteText }),
//     });
//     if (r.ok) {
//       setShowModal(false);
//       // reload notes only
//       const res = await fetch("/api/calendarNotes", { cache: "no-store" });
//       const notes = await res.json();
//       const noteEvents = notes.map((n) => ({
//         id: `note-${n.date}`,
//         title: `Note: ${n.note}`,
//         start: n.date,
//         allDay: true,
//         backgroundColor: "transparent",
//         borderColor: "transparent",
//         textColor: "#eab308",
//         classNames: ["note-event"],
//         extendedProps: { kind: "note", raw: n },
//       }));
//       // keep current bookings
//       const bookings = events.filter((e) => e.extendedProps?.kind === "booking");
//       setEvents([...noteEvents, ...bookings]);
//     } else {
//       alert("Failed to save note");
//     }
//   }

//   if (!authReady) return <div className="p-6 text-center">Checking admin permissions…</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-3">Booked Events Calendar</h1>

//       <div className="flex gap-8 mb-6 text-lg font-medium">
//         <p>Total bookings: <span className="font-bold text-blue-600">{totalEvents}</span></p>
//         <p>This month: <span className="font-bold text-green-600">{monthEvents}</span></p>
//       </div>

//      <FullCalendar
//   plugins={[dayGridPlugin]}
//   initialView="dayGridMonth"
//   events={events}
//   selectable={true}    // <-- add this
//   dateClick={handleDateClick} // <-- your existing dateClick handler
//   eventClick={(info) => {
//     const p = info.event.extendedProps;
//     alert(
// `📸 Booking Details

// Event: ${info.event.title}
// Date: ${info.event.startStr}
// Name: ${p.name}
// Phone: ${p.phone}
// Location: ${p.location}
// Guests: ${p.guests}
// Duration: ${p.duration}
// Contact via: ${p.contactMethod}
// Notes from client: ${p.comments || "None"}
// `);
//         }}
//       />

//       {/* Logout */}
//       <LogoutButton />

//       {/* Modal (dark glass) */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-700 rounded-2xl p-6 w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-3 text-white">
//               {noteText ? "Edit Note" : "Add Note"} — {noteDate}
//             </h2>
//             <textarea
//               className="w-full h-32 p-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 outline-none"
//               placeholder="Type your admin note for this date…"
//               value={noteText}
//               onChange={(e) => setNoteText(e.target.value)}
//             />
//             <div className="mt-4 flex gap-3 justify-end">
//               <button
//                 className="px-4 py-2 rounded bg-neutral-700 text-white"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 rounded bg-amber-500 text-black font-semibold"
//                 onClick={saveNote}
//               >
//                 Save Note
//               </button>
//             </div>
//             <p className="mt-3 text-xs text-neutral-400">One note per date. Saving again will overwrite.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { collection, getDocs } from "firebase/firestore";
import LogoutButton from "@/components/logoutButton";

export default function CalendarPage() {
  const router = useRouter();

  // auth
  const [authReady, setAuthReady] = useState(false);

  // data
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [monthEvents, setMonthEvents] = useState(0);

  // notes modal
  const [showModal, setShowModal] = useState(false);
  const [noteDate, setNoteDate] = useState("");   // "YYYY-MM-DD"
  const [noteText, setNoteText] = useState("");   // text

  // protect page
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => (!user ? router.push("/admin/login") : setAuthReady(true)));
    return () => unsub();
  }, [router]);

  // load bookings + notes
  useEffect(() => {
    if (!authReady) return;
    (async () => {
      // bookings
      const snap = await getDocs(collection(db, "bookings"));
      const bookingEvents = snap.docs.map((d) => {
        const x = d.data();
        return {
          id: d.id,
          title: `${x.eventType || "Event"} – ${x.name || ""}`,
          start: x.eventDate, // ISO
          allDay: true,
          extendedProps: { ...x, kind: "booking" },
        };
      });

      // notes
      const res = await fetch("/api/calendarNotes", { cache: "no-store" });
      const notes = await res.json(); // [{date, note}]
      const noteEvents = notes.map((n) => ({
        id: `note-${n.date}`,
        title: `Note: ${n.note}`,
        start: n.date,
        allDay: true,
        // style notes differently
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: "#eab308", // amber-500
        classNames: ["note-event"],
        extendedProps: { kind: "note", raw: n },
      }));

      // merge (notes first) to show above bookings
      const merged = [...noteEvents, ...bookingEvents];
      setEvents(merged);
      setTotalEvents(bookingEvents.length);

      // month count (bookings only)
      const now = new Date();
      const m = now.getMonth(), y = now.getFullYear();
      setMonthEvents(
        bookingEvents.filter((ev) => {
          const dt = new Date(ev.start);
          return dt.getMonth() === m && dt.getFullYear() === y;
        }).length
      );
    })();
  }, [authReady]);

  // open modal on date click
  async function handleDateClick(info) {
    const dateISO = info.dateStr; // YYYY-MM-DD
    setNoteDate(dateISO);

    // fetch existing note for this date (from already loaded events)
    const existing = events.find((e) => e.extendedProps?.kind === "note" && e.start === dateISO);
    setNoteText(existing ? existing.extendedProps.raw.note : "");
    setShowModal(true);
  }

  // save note (upsert)
  async function saveNote() {
    const r = await fetch("/api/calendarNotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: noteDate, note: noteText }),
    });
    if (r.ok) {
      setShowModal(false);
      // reload notes only
      const res = await fetch("/api/calendarNotes", { cache: "no-store" });
      const notes = await res.json();
      const noteEvents = notes.map((n) => ({
        id: `note-${n.date}`,
        title: `Note: ${n.note}`,
        start: n.date,
        allDay: true,
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: "#eab308",
        classNames: ["note-event"],
        extendedProps: { kind: "note", raw: n },
      }));
      // keep current bookings
      const bookings = events.filter((e) => e.extendedProps?.kind === "booking");
      setEvents([...noteEvents, ...bookings]);
    } else {
      alert("Failed to save note");
    }
  }

  if (!authReady) return <div className="p-6 text-center">Checking admin permissions…</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">Booked Events Calendar</h1>

      <div className="flex gap-8 mb-6 text-lg font-medium">
        <p>Total bookings: <span className="font-bold text-blue-600">{totalEvents}</span></p>
        <p>This month: <span className="font-bold text-green-600">{monthEvents}</span></p>
      </div>

     <FullCalendar
  plugins={[dayGridPlugin]}
  initialView="dayGridMonth"
  events={events}
  selectable={true}    // <-- add this
  dateClick={handleDateClick} // <-- your existing dateClick handler
  eventClick={(info) => {
    const p = info.event.extendedProps;
    alert(
`📸 Booking Details

Event: ${info.event.title}
Date: ${info.event.startStr}
Name: ${p.name}
Phone: ${p.phone}
Location: ${p.location}
Guests: ${p.guests}
Duration: ${p.duration}
Contact via: ${p.contactMethod}
Notes from client: ${p.comments || "None"}
`);
        }}
      />

      {/* Logout */}
      <LogoutButton />

      {/* Modal (dark glass) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-700 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-3 text-white">
              {noteText ? "Edit Note" : "Add Note"} — {noteDate}
            </h2>
            <textarea
              className="w-full h-32 p-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 outline-none"
              placeholder="Type your admin note for this date…"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
            <div className="mt-4 flex gap-3 justify-end">
              <button
                className="px-4 py-2 rounded bg-neutral-700 text-white"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-amber-500 text-black font-semibold"
                onClick={saveNote}
              >
                Save Note
              </button>
            </div>
            <p className="mt-3 text-xs text-neutral-400">One note per date. Saving again will overwrite.</p>
          </div>
        </div>
      )}
    </div>
  );
}
