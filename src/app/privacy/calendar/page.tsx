"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebaseConfig";
import LogoutButton from "@/components/logoutButton";
import { onAuthStateChanged } from "firebase/auth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { collection, getDocs } from "firebase/firestore";
import type { EventInput } from "@fullcalendar/core";

export default function CalendarPage() {
  const router = useRouter();

  // auth state
  const [authReady, setAuthReady] = useState<boolean>(false);

  // FIXED: typed state
  const [events, setEvents] = useState<EventInput[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [monthEvents, setMonthEvents] = useState<number>(0);

  // protect route
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/admin/login");
      else setAuthReady(true);
    });
    return () => unsub();
  }, [router]);

  // load bookings
  useEffect(() => {
    if (!authReady) return;

    (async () => {
      const snap = await getDocs(collection(db, "bookings"));

      const list: EventInput[] = snap.docs.map((d) => {
        const x = d.data() as any;

        // normalize date
        const rawDate = x.eventDate || x.date || "";
        const isoDate = rawDate
          ? new Date(rawDate).toISOString()
          : new Date().toISOString();

        return {
          id: d.id,
          title: `${x.eventType || "Event"} – ${x.name || ""}`,
          start: isoDate,
          allDay: true,
          extendedProps: { ...x },
        } as EventInput;
      });

      setEvents(list);
      setTotalEvents(list.length);

      // count events this month
      const now = new Date();
      const month = now.getMonth();
      const year = now.getFullYear();

      const thisMonth = list.filter((ev) => {
        const dt = new Date(ev.start as string);
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
        <p>
          Total events:{" "}
          <span className="font-bold text-blue-600">{totalEvents}</span>
        </p>
        <p>
          This month:{" "}
          <span className="font-bold text-green-600">{monthEvents}</span>
        </p>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => {
          const p = info.event.extendedProps as any;
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
