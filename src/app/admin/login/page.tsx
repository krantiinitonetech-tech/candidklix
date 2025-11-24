// "use client";

// import { useState } from "react";
// import { auth } from "@/lib/firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useRouter } from "next/navigation";

// export default function AdminLogin() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await signInWithEmailAndPassword(auth, form.email, form.password);

//       if(res.user.email !== "kranti.initone@gmail.com") {
//         setError("Unauthorized user");
//         return;
//       }

//       router.push("/admin/calendar");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form className="bg-white p-8 shadow-xl rounded-xl w-96" onSubmit={handleSubmit}>
//         <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

//         {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

//         <input
//           type="email"
//           placeholder="Admin Email"
//           className="border p-2 w-full mb-3 rounded"
//           onChange={(e)=> setForm({...form, email: e.target.value})}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full mb-4 rounded"
//           onChange={(e)=> setForm({...form, password: e.target.value})}
//         />

//         <button
//           type="submit"
//           className="w-full bg-black text-white p-2 rounded hover:bg-gray-900 transition"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in → redirect
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/admin/calender");
    });
    return () => unsub();
  }, [router]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/calendar");
    } catch (err: any) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

      <form onSubmit={handleLogin} className="bg-white p-6 shadow rounded w-80 space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-blue-600 text-white p-2 rounded font-medium">
          Login
        </button>
      </form>
    </div>
  );
}
