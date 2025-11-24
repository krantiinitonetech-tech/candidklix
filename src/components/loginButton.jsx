"use client";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton(){
  const router = useRouter();
  return (
    <button
      className="bg-red-600 text-white px-4 py-2 rounded mt-4"
      onClick={async()=> { await signOut(auth); router.push("/admin/login"); }}
    >
      Logout
    </button>
  );
}
