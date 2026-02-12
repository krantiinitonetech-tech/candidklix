"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebaseConfig";
import LogoutButton from "@/components/logoutButton";
import { onAuthStateChanged } from "firebase/auth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import type { EventInput } from "@fullcalendar/core";

export default function CalendarPage() {
  const router = useRouter();

  const [authReady, setAuthReady] = useState<boolean>(false);
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

  // Helper: delete bookings if environment flag is ON
  useEffect(() => {
    if (!authReady) return;

  const shouldReset =
  process.env.NEXT_PUBLIC_RESET_BOOKINGS === "1";

    if (!shouldReset) return;

    (async () => {
      try {
        const snap = await getDocs(collection(db, "bookings"));
        const deletes = snap.docs.map((d) =>
          deleteDoc(doc(db, "bookings", d.id))
        );
        await Promise.all(deletes);

        setEvents([]);
        setTotalEvents(0);
        setMonthEvents(0);
      } catch (err) {
        console.error("Reset failed:", err);
      }
    })();
  }, [authReady]);

  // load bookings
  useEffect(() => {
    if (!authReady) return;

    (async () => {
      const snap = await getDocs(collection(db, "bookings"));

      const list: EventInput[] = snap.docs.map((d) => {
        const x = d.data() as any;
        const rawDate = x.eventDate || x.date;
        const isoDate = rawDate
          ? new Date(rawDate).toISOString()
          : new Date().toISOString();

        return {
          id: d.id,
          title: `${x.eventType || "Event"} – ${x.name || ""}`,
          start: isoDate,
          allDay: true,
          extendedProps: x,
        };
      });

      setEvents(list);
      setTotalEvents(list.length);

      // Monthly count
      const now = new Date();
      setMonthEvents(
        list.filter((ev) => {
          const dt = new Date(ev.start as string);
          return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear();
        }).length
      );
    })();
  }, [authReady]);

  if (!authReady) {
    return <div className="p-6 text-center">Checking admin permissions…</div>;
  }

  return (
    <div className="calendar-wrapper">
      <h1 className="calendar-title">Booked Events Calendar</h1>

      <div className="stats-box">
        <p>
          Total events: <span className="stat-number">{totalEvents}</span>
        </p>
        <p>
          This month: <span className="stat-number green">{monthEvents}</span>
        </p>
      </div>

      <div className="calendar-card">
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
Notes: ${p.comments || "None"}`);
          }}
        />
      </div>

      <LogoutButton />

      {/* 🌸 Embedded Pastel CSS */}
      <style jsx>{`
  .calendar-wrapper {
    padding: 50px 24px;
    background: #f4f1ec;
    min-height: 100vh;
  }

  .calendar-title {
    font-family: var(--font-heading);
    font-size: 36px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 24px;
    color: #222;
  }

  .stats-box {
    display: flex;
    justify-content: center;
    gap: 50px;
    background: #e9e3dc;
    padding: 18px 32px;
    border-radius: 10px;
    margin-bottom: 32px;
    font-size: 16px;
    color: #333;
  }

  .stat-number {
    font-weight: 700;
    color: #000;
  }

  .stat-number.green {
    color: #2e7d32;
  }

  .calendar-card {
    background: #ffffff;
    padding: 24px;
    border-radius: 14px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  }

  /* ===== FullCalendar Professional Sizing ===== */

  :global(.fc) {
    font-size: 14px;
  }

  /* Reduce date cell height */
  :global(.fc .fc-daygrid-day-frame) {
    min-height: 85px !important;
  }

  :global(.fc .fc-daygrid-day-top) {
    padding: 4px 6px;
  }

  :global(.fc .fc-daygrid-day-number) {
    font-size: 13px;
    color: #333 !important;
  }

  :global(.fc .fc-col-header-cell) {
    padding: 8px 0;
    font-size: 13px;
    font-weight: 600;
  }

  :global(.fc-toolbar-title) {
    font-family: var(--font-heading);
    font-size: 22px;
    color: #222;
    font-weight: 600;
  }

  :global(.fc-button) {
    background: #5a5a5a !important;
    border: none !important;
    border-radius: 6px !important;
    padding: 5px 12px !important;
    font-size: 13px !important;
    color: white !important;
  }

  :global(.fc-button:hover) {
    background: #444 !important;
  }

  :global(.fc-daygrid-event) {
    background: #2f2929 !important;
    border: none !important;
    color: #222 !important;
    font-weight: 500;
    border-radius: 4px;
    padding: 1px 5px;
    font-size: 12px;
  }
    .fc-h-event .fc-event-title {
    display: inline-block;
    left: 0px;
    max-width: 100%;
    overflow: hidden;
    right: 0px;
    vertical-align: top;
    color: black;
}

  :global(.fc-today) {
    background: #f6efe7 !important;
  }

  @media (max-width: 768px) {
    .stats-box {
      flex-direction: column;
      gap: 10px;
      text-align: center;
    }

    .calendar-title {
      font-size: 26px;
      color:#333;
    }

    :global(.fc .fc-daygrid-day-frame) {
      min-height: 70px !important;
    }
  }
`}</style>


    </div>
  );
}
