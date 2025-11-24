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
// import interactionPlugin from "@fullcalendar/interaction";
// import "@fullcalendar/common/main.css";
// import "@fullcalendar/daygrid/main.css";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth, db } from "@/lib/firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { collection, getDocs } from "firebase/firestore";
// import LogoutButton from "@/components/logoutButton";

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
//       const res = await fetch("/api/calendarnotes", { cache: "no-store" });
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
//     const r = await fetch("/api/calendarnotes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ date: noteDate, note: noteText }),
//     });
//     if (r.ok) {
//       setShowModal(false);
//       // reload notes only
//       const res = await fetch("/api/calendarnotes", { cache: "no-store" });
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

// <FullCalendar
//   plugins={[dayGridPlugin, interactionPlugin]}
//   initialView="dayGridMonth"
//   events={events}
//   selectable={true}         // <--- this enables click on date
//   dateClick={handleDateClick}  // <--- opens note modal
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
// Notes from client: ${p.comments || "None"}`
//     );
//   }}
// />
//      {/* Logout */}
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


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth, db } from "@/lib/firebaseConfig";
// import LogoutButton from "@/components/logoutButton";
// import { onAuthStateChanged } from "firebase/auth";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   query,
//   where,
//   orderBy,
// } from "firebase/firestore";

// export default function CalendarPage() {
//   const router = useRouter();
//   const [authReady, setAuthReady] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [noteText, setNoteText] = useState("");
//   const [notes, setNotes] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   // Authentication check
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       if (!user) router.push("/admin/login");
//       else setAuthReady(true);
//     });
//     return () => unsub();
//   }, [router]);

//   // Load events
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
//     })();
//   }, [authReady]);

//   // Load notes for a specific event
//   async function loadNotes(eventId) {
//     const q = query(
//       collection(db, "calendarNotes"),
//       where("eventId", "==", eventId),
//       orderBy("createdAt", "desc")
//     );
//     const snap = await getDocs(q);
//     const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//     setNotes(list);
//   }

//   // Add a new note
//   async function handleAddNote() {
//     if (!noteText.trim()) return;
//     await addDoc(collection(db, "calendarNotes"), {
//       eventId: selectedEvent.id,
//       note: noteText,
//       createdAt: new Date().toISOString(),
//     });
//     setNoteText("");
//     loadNotes(selectedEvent.id);
//   }

//   if (!authReady) {
//     return <div className="p-6 text-center">Checking admin permissions…</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-3">📅 Booked Events Calendar</h1>

//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         eventClick={async (info) => {
//           const p = info.event.extendedProps;
//           const evt = { id: info.event.id, ...p };
//           setSelectedEvent(evt);
//           setShowModal(true);
//           loadNotes(info.event.id);
//         }}
//       />

//       {/* Modal for Notes */}
//       {showModal && selectedEvent && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
//             <h2 className="text-xl font-bold mb-2">
//               {selectedEvent.eventType} – {selectedEvent.name}
//             </h2>
//             <p className="text-gray-500 mb-4">
//               Date: {selectedEvent.eventDate} | Location:{" "}
//               {selectedEvent.location}
//             </p>

//             <div className="border-t pt-3 mb-3">
//               <h3 className="font-semibold mb-2">📓 Notes</h3>
//               <ul className="max-h-40 overflow-y-auto mb-2 space-y-1">
//                 {notes.length === 0 && (
//                   <li className="text-gray-400 text-sm">No notes yet</li>
//                 )}
//                 {notes.map((n) => (
//                   <li key={n.id} className="text-gray-700 text-sm">
//                     • {n.note}
//                   </li>
//                 ))}
//               </ul>

//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={noteText}
//                   onChange={(e) => setNoteText(e.target.value)}
//                   placeholder="Add a note..."
//                   className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm"
//                 />
//                 <button
//                   onClick={handleAddNote}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>

//             <button
//               onClick={() => setShowModal(false)}
//               className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg w-full hover:bg-gray-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       <LogoutButton />
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { useRouter } from "next/navigation";
// import { auth, db } from "@/lib/firebaseConfig";
// import LogoutButton from "@/components/logoutButton";
// import { onAuthStateChanged } from "firebase/auth";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   query,
//   where,
//   orderBy,
// } from "firebase/firestore";

// export default function CalendarPage() {
//   const router = useRouter();
//   const [authReady, setAuthReady] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [notes, setNotes] = useState([]);
//   const [noteText, setNoteText] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [datesWithNotes, setDatesWithNotes] = useState([]);

//   // ✅ Check Authentication
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       if (!user) router.push("/admin/login");
//       else setAuthReady(true);
//     });
//     return () => unsub();
//   }, [router]);

//   // ✅ Load Booked Events
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
//     })();

//     loadAllNoteDates(); // show note indicators
//   }, [authReady]);

//   // ✅ Load all note dates (for indicator dots)
//   async function loadAllNoteDates() {
//     const snap = await getDocs(collection(db, "calendarNotes"));
//     const all = snap.docs.map((d) => d.data().date);
//     setDatesWithNotes([...new Set(all)]);
//   }

//   // ✅ Load notes for a single date
//   async function loadNotesForDate(date) {
//     const q = query(
//       collection(db, "calendarNotes"),
//       where("date", "==", date),
//       orderBy("createdAt", "desc")
//     );
//     const snap = await getDocs(q);
//     const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//     setNotes(list);
//   }

//   // ✅ Add note
//   async function handleAddNote() {
//     if (!noteText.trim() || !selectedDate) return;
//     await addDoc(collection(db, "calendarNotes"), {
//       date: selectedDate,
//       note: noteText.trim(),
//       createdAt: new Date().toISOString(),
//     });
//     setNoteText("");
//     await loadNotesForDate(selectedDate);
//     await loadAllNoteDates();
//   }

//   // ✅ Handle Date Click
//   const handleDateClick = (info) => {
//     const date = info.dateStr;
//     setSelectedDate(date);
//     setShowModal(true);
//     loadNotesForDate(date);
//   };

//   if (!authReady) {
//     return <div className="p-6 text-center">Checking admin permissions…</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-3">📅 Calendar with Notes</h1>

//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         dateClick={handleDateClick}
//         dayCellContent={(arg) => {
//           const dateStr = arg.date.toISOString().split("T")[0];
//           const hasNote = datesWithNotes.includes(dateStr);
//           return (
//             <div className="flex flex-col items-center text-sm">
//               <span>{arg.dayNumberText}</span>
//               {hasNote && (
//                 <span className="w-2 h-2 rounded-full bg-green-500 mt-1"></span>
//               )}
//               <button
//                 className="mt-1 text-[10px] bg-blue-100 text-blue-700 px-1 py-[1px] rounded hover:bg-blue-200"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedDate(dateStr);
//                   setShowModal(true);
//                   loadNotesForDate(dateStr);
//                 }}
//               >
//                 📝 Note
//               </button>
//             </div>
//           );
//         }}
//       />

//       <LogoutButton />

//       {/* Render modal outside FullCalendar via portal */}
//       {showModal &&
//         createPortal(
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//             onClick={() => setShowModal(false)}
//           >
//             <div
//               className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h2 className="text-xl font-semibold mb-2">
//                 Notes for {selectedDate}
//               </h2>

//               <div className="border-t pt-3 mb-3">
//                 <ul className="max-h-40 overflow-y-auto space-y-1">
//                   {notes.length === 0 && (
//                     <li className="text-gray-400 text-sm">No notes yet</li>
//                   )}
//                   {notes.map((n) => (
//                     <li key={n.id} className="text-gray-700 text-sm">
//                       • {n.note}
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="flex gap-2 mt-3">
//                   <input
//                     type="text"
//                     value={noteText}
//                     onChange={(e) => setNoteText(e.target.value)}
//                     placeholder="Add a note..."
//                     className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm"
//                   />
//                   <button
//                     onClick={handleAddNote}
//                     className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg w-full hover:bg-gray-300"
//               >
//                 Close
//               </button>
//             </div>
//           </div>,
//           document.body
//         )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { useRouter } from "next/navigation";
// import { auth, db } from "@/lib/firebaseConfig";
// import LogoutButton from "@/components/logoutButton";
// import { onAuthStateChanged } from "firebase/auth";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   query,
//   where,
//   orderBy,
// } from "firebase/firestore";

// export default function CalendarPage() {
//   const router = useRouter();
//   const [authReady, setAuthReady] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [notes, setNotes] = useState([]);
//   const [noteText, setNoteText] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [datesWithNotes, setDatesWithNotes] = useState([]);

//   // ✅ Check Authentication
//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       if (!user) router.push("/admin/login");
//       else setAuthReady(true);
//     });
//     return () => unsub();
//   }, [router]);

//   // ✅ Load Booked Events
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
//     })();

//     loadAllNoteDates(); // show note indicators
//   }, [authReady]);

//   // ✅ Load all note dates (for indicator dots)
//   async function loadAllNoteDates() {
//     const snap = await getDocs(collection(db, "calendarNotes"));
//     const all = snap.docs.map((d) => d.data().date);
//     setDatesWithNotes([...new Set(all)]);
//   }

//   // ✅ Load notes for a single date
//   async function loadNotesForDate(date) {
//     try {
//       const q = query(
//         collection(db, "calendarNotes"),
//         where("date", "==", date),
//         orderBy("createdAt", "desc")
//       );
//       const snap = await getDocs(q);
//       const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//       setNotes(list);
//     } catch (err) {
//       console.error("Error loading notes:", err);
//     }
//   }

//   // ✅ Add note
//   async function handleAddNote() {
//     if (!noteText.trim() || !selectedDate) return;
//     await addDoc(collection(db, "calendarNotes"), {
//       date: selectedDate,
//       note: noteText.trim(),
//       createdAt: new Date().toISOString(),
//     });
//     setNoteText("");
//     await loadNotesForDate(selectedDate);
//     await loadAllNoteDates();
//   }

//   // ✅ Handle Date Click (for adding notes)
//   const handleDateClick = (info) => {
//     const date = info.dateStr;
//     setSelectedDate(date);
//     setShowModal(true);
//     loadNotesForDate(date);
//   };

//   if (!authReady) {
//     return <div className="p-6 text-center">Checking admin permissions…</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-3">📅 Calendar with Notes</h1>

//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         dateClick={handleDateClick}
        
//         // 🟦 Click on a booked event → show event details
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

//         dayCellContent={(arg) => {
//           const dateStr = arg.date.toISOString().split("T")[0];
//           const hasNote = datesWithNotes.includes(dateStr);
//           return (
//             <div className="flex flex-col items-center text-sm">
//               <span>{arg.dayNumberText}</span>
//               {hasNote && (
//                 <span className="w-2 h-2 rounded-full bg-green-500 mt-1"></span>
//               )}
//               <button
//                 className="mt-1 text-[10px] bg-blue-100 text-blue-700 px-1 py-[1px] rounded hover:bg-blue-200"
//                 onClick={(e) => {
//                   e.stopPropagation(); // prevents event click from triggering
//                   setSelectedDate(dateStr);
//                   setShowModal(true);
//                   loadNotesForDate(dateStr);
//                 }}
//               >
//                 📝 Note
//               </button>
//             </div>
//           );
//         }}
//       />

//       <LogoutButton />

//       {/* Render modal outside FullCalendar via portal */}
//       {showModal &&
//         createPortal(
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//             onClick={() => setShowModal(false)}
//           >
//             <div
//               className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h2 className="text-xl font-semibold mb-2">
//                 Notes for {selectedDate}
//               </h2>

//               <div className="border-t pt-3 mb-3">
//                 <ul className="max-h-40 overflow-y-auto space-y-1">
//                   {notes.length === 0 && (
//                     <li className="text-gray-400 text-sm">No notes yet</li>
//                   )}
//                   {notes.map((n) => (
//                     <li key={n.id} className="text-gray-700 text-sm">
//                       • {n.note}
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="flex gap-2 mt-3">
//                   <input
//                     type="text"
//                     value={noteText}
//                     onChange={(e) => setNoteText(e.target.value)}
//                     placeholder="Add a note..."
//                     className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm"
//                   />
//                   <button
//                     onClick={handleAddNote}
//                     className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg w-full hover:bg-gray-300"
//               >
//                 Close
//               </button>
//             </div>
//           </div>,
//           document.body
//         )}
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
