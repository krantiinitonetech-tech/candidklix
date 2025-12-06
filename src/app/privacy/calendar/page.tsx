"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebaseConfig";  
import LogoutButton from "@/components/logoutButton";
import { onAuthStateChanged } from "firebase/auth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { collection, getDocs } from "firebase/firestore";

export default function CalendarPage() {
  const router = useRouter();

  // auth state
  const [authReady, setAuthReady] = useState(false);

  // calendar state
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [monthEvents, setMonthEvents] = useState(0);

  // 🔐 PROTECT PAGE
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/admin/login");
      else setAuthReady(true);
    });
    return () => unsub();
  }, [router]);

  // load events data after auth verifies
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
      setTotalEvents(list.length);

      // this month filter count
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();

      const thisMonth = list.filter((ev) => {
        const dt = new Date(ev.start);
        return dt.getMonth() === month && dt.getFullYear() === year;
      });

      setMonthEvents(thisMonth.length);
    })();
  }, [authReady]);

  if (!authReady) {
    return <div className="p-6 text-center">Checking admin permissions…</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">Booked Events Calendar</h1>

      <div className="flex gap-8 mb-6 text-lg font-medium">
        <p>Total events: <span className="font-bold text-blue-600">{totalEvents}</span></p>
        <p>This month: <span className="font-bold text-green-600">{monthEvents}</span></p>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
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
       
      />

      <LogoutButton />
    </div>
  );
  
}