// "use client";

// import { auth } from "@/lib/firebaseConfig";
// import { signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";

// export default function LogoutButton() {
//   const router = useRouter();

//   return (
//     <button
//       className="bg-red-600 text-white px-10 py-2 rounded mt-8"
//       onClick={async () => {
//         await signOut(auth);
//         router.push("/admin/login");
//       }}
//     >
//       Logout
//     </button>
//   );
// }

"use client";

import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      className="logout-btn"
      onClick={async () => {
        await signOut(auth);
        router.push("/admin/login");
      }}
    >
      Logout
      <style jsx>{`
        .logout-btn {
          display: block;
          margin: 40px auto 0;
          padding: 12px 36px;
          background: #222;
          color: #fff;
          border: none;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .logout-btn:hover {
          background: #000;
        }
      `}</style>
    </button>
  );
}