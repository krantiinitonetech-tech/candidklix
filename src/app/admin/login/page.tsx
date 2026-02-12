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
      if (user) router.push("/admin/calendar");
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
  <>
    <div className="admin-page">
      <div className="admin-center">
        <div className="admin-box">
          <h1 className="admin-title">Admin Dashboard</h1>

          <form onSubmit={handleLogin} className="admin-form">
            <div className="form-group">
              <label>Admin Email</label>
              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>

    <style jsx>{`
      .admin-page {
        background: #f4f1ec;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .admin-center {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .admin-box {
        width: 100%;
        max-width: 420px;
        text-align: center;
      }

      .admin-title {
        font-family: serif;
        font-size: 32px;
        margin-bottom: 40px;
        color: #222;
      }

      .admin-form {
        display: flex;
        flex-direction: column;
        gap: 28px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        text-align: left;
      }

      .form-group label {
        margin-bottom: 8px;
        font-size: 14px;
        color: #333;
      }

      .form-group input {
        padding: 14px;
        border: none;
        background: #eaeaea;
        font-size: 14px;
      }

      .login-btn {
        margin-top: 10px;
        padding: 12px;
        background: #5a5a5a;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 14px;
        transition: 0.3s ease;
      }

      .login-btn:hover {
        background: #444;
      }

      .error-text {
        color: red;
        font-size: 13px;
      }
    `}</style>
  </>
);

}
