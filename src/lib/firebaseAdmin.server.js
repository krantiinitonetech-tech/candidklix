import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const svc = process.env.FIREBASE_SERVICE_ACCOUNT_JSON && JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

if (!global.__firebaseAdmin && !getApps().length) {
  initializeApp({ credential: cert(svc) });
  global.__firebaseAdmin = true;
  console.log("✅ Firebase Admin initialized successfully");
}

export const adminDb = getFirestore();
