"use client";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useEffect, useState } from "react";

export default function TestFirebase() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const testFirestore = async () => {
      try {
        // Add a sample document
        await addDoc(collection(db, "testCollection"), {
          name: "Dopods Test",
          createdAt: new Date().toISOString(),
        });
        console.log("✅ Document added!");

        // Fetch all documents
        const querySnapshot = await getDocs(collection(db, "testCollection"));
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("📦 Documents fetched:", docs);
        setData(docs);
      } catch (error) {
        console.error("❌ Firebase error:", error);
      }
    };

    testFirestore();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">🔥 Firebase Firestore Test</h1>
      <p>Check your console for logs.</p>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name} — {item.createdAt}</li>
        ))}
      </ul>
    </div>
  );
}
