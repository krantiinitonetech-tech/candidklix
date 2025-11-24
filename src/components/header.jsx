"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export default function Header() {
  const router = useRouter();
  const [openServices, setOpenServices] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const servicesRef = useRef(null);

  // close dropdown on outside click or ESC
  useEffect(() => {
    function onDoc(e) {
      if (e.key === "Escape") {
        setOpenServices(false);
        setShowModal(false);
      }
    }
    function onClick(e) {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setOpenServices(false);
      }
    }
    document.addEventListener("keydown", onDoc);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onDoc);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  function handleNav(path) {
    setOpenServices(false);
    router.push(path);
  }

  return (
    <>
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold tracking-tight"
            >
              CandidKlix
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">

            {/* SERVICES DROPDOWN */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setOpenServices((s) => !s)}
                aria-expanded={openServices}
                className="px-2 py-1 hover:underline"
              >
                Services
              </button>

              {openServices && (
               <ul
  role="menu"
  className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-2"
>
  <li>
    <Link
      href="/gallery/wedding"
      className="block px-4 py-2 hover:bg-gray-50"
      onClick={() => setOpenServices(false)}
    >
      Wedding
    </Link>
  </li>

  <li>
    <Link
      href="/gallery/baby-shower"
      className="block px-4 py-2 hover:bg-gray-50"
      onClick={() => setOpenServices(false)}
    >
      Baby Shower
    </Link>
  </li>

  <li>
    <Link
      href="/gallery/graduation"
      className="block px-4 py-2 hover:bg-gray-50"
      onClick={() => setOpenServices(false)}
    >
      Graduation
    </Link>
  </li>

  <li>
    <Link
      href="/gallery/food-photography"
      className="block px-4 py-2 hover:bg-gray-50"
      onClick={() => setOpenServices(false)}
    >
      Food Photography
    </Link>
  </li>
</ul>

              )}
            </div>

            {/* CORRECT LINK USAGE  */}
            <Link href="/portfolio" className="px-2 py-1 hover:underline">
              Portfolio
            </Link>

            <Link href="/about" className="px-2 py-1 hover:underline">
              About
            </Link>

            {/* BOOK SESSION */}
            <Link
  href="/booking"
  className="ml-4 px-4 py-2 rounded-lg border hover:bg-gray-50"
>
  Book Session
</Link>

          </nav>
        </div>
      </header>

      {showModal && <BookSessionModal onClose={() => setShowModal(false)} />}
    </>
  );
}


/* =======================
   BOOK SESSION MODAL
   ======================= */
function BookSessionModal({ onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        
        <button
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-2">Book a Session</h3>
        <p className="text-sm text-gray-600 mb-4">
          Tell us a bit about your shoot, and we’ll reach out.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks — we will contact you shortly.");
            onClose();
          }}
        >
          <input
            name="name"
            placeholder="Your name"
            className="w-full mb-2 px-3 py-2 border rounded"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full mb-2 px-3 py-2 border rounded"
            required
          />
          <select
            name="service"
            className="w-full mb-4 px-3 py-2 border rounded"
          >
            <option value="wedding">Wedding</option>
            <option value="baby-shower">Baby Shower</option>
            <option value="graduation">Graduation</option>
            <option value="food-photography">Food Photography</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
