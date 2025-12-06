// "use client";
// import { useState } from "react";

// export default function BookingPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     eventType: "",
//     eventDate: "",
//     duration: "",
//     guests: "",
//     location: "",
//     contactMethod: "Email",
//     comments: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const json = await res.json();

//       if (res.ok) {
//         setMessage("✅ Booking submitted successfully!");
//         setFormData({
//           name: "",
//           phone: "",
//           eventType: "",
//           eventDate: "",
//           duration: "",
//           guests: "",
//           location: "",
//           contactMethod: "Email",
//           comments: "",
//         });
//       } else {
//         setMessage(`⚠️ ${json.error || "Something went wrong."}`);
//       }
//     } catch (error) {
//       setMessage("❌ Failed to submit booking.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-6">
//       <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
//         <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//           📸 CandidKlix Booking Form
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {[
//             { name: "name", label: "Your Name" },
//             { name: "phone", label: "Phone Number" },
//             { name: "eventType", label: "Event Type" },
//             { name: "eventDate", label: "Event Date", type: "date" },
//             { name: "duration", label: "Duration" },
//             { name: "guests", label: "Number of Guests" },
//             { name: "location", label: "Event Location" },
//           ].map(({ name, label, type = "text" }) => (
//             <div key={name}>
//               <label className="block text-gray-700 font-medium mb-1">
//                 {label}
//               </label>
//               <input
//                 type={type}
//                 name={name}
//                 value={formData[name]}
//                 onChange={(e) =>
//                   setFormData({ ...formData, [name]: e.target.value })
//                 }
//                 required
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>
//           ))}

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Contact Method
//             </label>
//             <select
//               name="contactMethod"
//               value={formData.contactMethod}
//               onChange={(e) =>
//                 setFormData({ ...formData, contactMethod: e.target.value })
//               }
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option>Email</option>
//               <option>Phone</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Comments
//             </label>
//             <textarea
//               name="comments"
//               value={formData.comments}
//               onChange={(e) =>
//                 setFormData({ ...formData, comments: e.target.value })
//               }
//               rows={3}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
//           >
//             {loading ? "Submitting..." : "Submit Booking"}
//           </button>
//         </form>

//         {message && (
//           <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: "",
    eventDate: "",
    duration: "",
    guests: "",
    location: "",
    contactMethod: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 1️⃣ Save booking to Firestore via backend API
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save booking");

      // 2️⃣ Send notification email using EmailJS from browser
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSuccess("Booking submitted successfully! We’ll contact you soon.");
      setForm({
        name: "",
        phone: "",
        eventType: "",
        eventDate: "",
        duration: "",
        guests: "",
        location: "",
        contactMethod: "",
        comments: "",
      });
    } catch (err) {
      console.error("🔥 Booking error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl space-y-4"
      >
        <h1 className="text-3xl font-bold text-center mb-4">
          Candid Klix Photography – Quote Request
        </h1>

        <p className="text-gray-500 text-center">
          After you fill out this form, we’ll contact you with an estimated quote and availability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name *" className="p-3 border rounded-lg" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" className="p-3 border rounded-lg" required />
          <input name="eventType" value={form.eventType} onChange={handleChange} placeholder="Event Type *" className="p-3 border rounded-lg" required />
          <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} className="p-3 border rounded-lg" required />
          <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g. 4 hours)" className="p-3 border rounded-lg" />
          <input name="guests" value={form.guests} onChange={handleChange} placeholder="No. of Guests" className="p-3 border rounded-lg" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location *" className="p-3 border rounded-lg" required />
          <input name="contactMethod" value={form.contactMethod} onChange={handleChange} placeholder="Preferred Contact Method" className="p-3 border rounded-lg" />
        </div>

        <textarea name="comments" value={form.comments} onChange={handleChange} placeholder="Additional Comments" className="p-3 border rounded-lg w-full" />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>

        {success && <p className="text-green-600 text-center mt-2">{success}</p>}
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
}
