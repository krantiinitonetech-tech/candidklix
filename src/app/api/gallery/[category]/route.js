// import { google } from "googleapis";
// import admin from "firebase-admin";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// // Initialize Firebase Admin
// if (!admin.apps.length) {
//   const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
//   admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
// }
// const db = admin.firestore();

// export async function GET(request, context) {
//   const { category } = context.params;

//   try {
//     if (!fs.existsSync(tokenPath)) {
//       return new Response("❌ Google tokens not found. Please reconnect Drive.", { status: 401 });
//     }

//     const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
//     const oauth2Client = new google.auth.OAuth2(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET,
//       process.env.GOOGLE_REDIRECT_URI
//     );
//     oauth2Client.setCredentials(tokens);

//     const drive = google.drive({ version: "v3", auth: oauth2Client });

//     // 🔹 1. Get category info from Firestore
//     const snap = await db.collection("categories").where("id", "==", category).limit(1).get();
//     if (snap.empty) {
//       return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 });
//     }

//     const doc = snap.docs[0].data();
//     const folderId = doc.folderId;
//     const type = doc.type;

//     // 🔹 2. List files in that folder
//     const mimeFilter = type === "video" ? "mimeType contains 'video/'" : "mimeType contains 'image/'";
//     const q = `'${folderId}' in parents and ${mimeFilter}`;
//     const res = await drive.files.list({
//       q,
//       fields: "files(id, name, mimeType)",
//       supportsAllDrives: true,
//     });

//     const files = res.data.files || [];

//     return new Response(JSON.stringify({ category: doc.title, files }), { status: 200 });
//   } catch (error) {
//     console.error("🔥 Error in category fetch:", error);
//     return new Response(`Error: ${error.message}`, { status: 500 });
//   }
// }

//Updated code below

// import { google } from "googleapis";
// import { adminDb } from "@/lib/firebaseAdmin.server";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// export async function GET(request, context) {
//   const { category } = context.params;

//   try {
//     // 🔒 Ensure Google token file exists
//     if (!fs.existsSync(tokenPath)) {
//       return new Response("❌ Google tokens not found. Please reconnect Drive.", { status: 401 });
//     }

//     // 🔹 Load stored OAuth tokens
//     const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
//     const oauth2Client = new google.auth.OAuth2(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET,
//       process.env.GOOGLE_REDIRECT_URI
//     );
//     oauth2Client.setCredentials(tokens);

//     const drive = google.drive({ version: "v3", auth: oauth2Client });

//     // 🔹 1. Get category info from Firestore
//     const snap = await adminDb.collection("categories").where("id", "==", category).limit(1).get();
//     if (snap.empty) {
//       return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 });
//     }

//     const doc = snap.docs[0].data();
//     const folderId = doc.folderId;
//     const type = doc.type || "photo";

//     // 🔹 2. List files from Drive
//     const mimeFilter = type === "video" ? "mimeType contains 'video/'" : "mimeType contains 'image/'";
//     const q = `'${folderId}' in parents and ${mimeFilter}`;
//     const res = await drive.files.list({
//       q,
//       fields: "files(id, name, mimeType, thumbnailLink, webViewLink)",
//       supportsAllDrives: true,
//     });

//     const files = (res.data.files || []).map(f => ({
//       id: f.id,
//       name: f.name,
//       mimeType: f.mimeType,
//       viewUrl: `https://drive.google.com/uc?export=view&id=${f.id}`,
//       downloadUrl: `https://drive.google.com/uc?export=download&id=${f.id}`
//     }));

//     return new Response(JSON.stringify({ title: doc.title, files }), { status: 200 });
//   } catch (error) {
//     console.error("🔥 Error in category fetch:", error);
//     return new Response(`Error: ${error.message}`, { status: 500 });
//   }
// }


// import { google } from "googleapis";
// import { adminDb } from "@/lib/firebaseAdmin.server";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// export async function GET(request, context) {
//   // ✅ Fix: Await params
//   const { category } = await context.params;

//   try {
//     if (!category) {
//       return new Response("❌ Category parameter missing.", { status: 400 });
//     }

//     // 🔒 Ensure Google token file exists
//     if (!fs.existsSync(tokenPath)) {
//       return new Response("❌ Google tokens not found. Please reconnect Drive.", { status: 401 });
//     }

//     // 🔹 Load stored OAuth tokens
//     const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
//     const oauth2Client = new google.auth.OAuth2(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET,
//       process.env.GOOGLE_REDIRECT_URI
//     );
//     oauth2Client.setCredentials(tokens);

//     const drive = google.drive({ version: "v3", auth: oauth2Client });

//     // 🔹 1. Get category info from Firestore
//     const snap = await adminDb
//       .collection("categories")
//       .where("id", "==", category)
//       .limit(1)
//       .get();

//     if (snap.empty) {
//       return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 });
//     }

//     const doc = snap.docs[0].data();
//     const folderId = doc.folderId;
//     const type = doc.type || "photo";

//     // 🔹 2. List files from Drive
//     const mimeFilter = type === "video"
//       ? "mimeType contains 'video/'"
//       : "mimeType contains 'image/'";

//     const q = `'${folderId}' in parents and ${mimeFilter}`;
//     const res = await drive.files.list({
//       q,
//       fields: "files(id, name, mimeType, thumbnailLink, webViewLink)",
//       supportsAllDrives: true,
//     });

//     const files = (res.data.files || []).map(f => ({
//       id: f.id,
//       name: f.name,
//       mimeType: f.mimeType,
//       viewUrl: `https://drive.google.com/uc?export=view&id=${f.id}`,
//       downloadUrl: `https://drive.google.com/uc?export=download&id=${f.id}`,
//     }));

//     return new Response(JSON.stringify({ title: doc.title, files }), { status: 200 });
//   } catch (error) {
//     console.error("🔥 Error in category fetch:", error);
//     return new Response(`Error: ${error.message}`, { status: 500 });
//   }
// }


// import { google } from "googleapis";
// import fs from "fs";
// import path from "path";

// // Load categories from JSON
// const categoriesPath = path.join(process.cwd(), "src/data/categories.json");
// const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));

// // OAuth setup
// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// export async function GET(request, { params }) {
//   try {
//     const category = params.category;
//     const cat = categories.find((c) => c.id === category);
//     if (!cat) {
//       return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 });
//     }

//     if (!fs.existsSync(tokenPath)) {
//       return new Response("❌ Google tokens not found. Please reconnect Drive.", { status: 401 });
//     }

//     const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
//     const oauth2Client = new google.auth.OAuth2(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET,
//       process.env.GOOGLE_REDIRECT_URI
//     );
//     oauth2Client.setCredentials(tokens);
//     const drive = google.drive({ version: "v3", auth: oauth2Client });

//     // Query Drive
//     const mimeFilter = cat.type === "video" ? "mimeType contains 'video/'" : "mimeType contains 'image/'";
//     const q = `'${cat.folderId}' in parents and ${mimeFilter}`;
//     const res = await drive.files.list({
//       q,
//       fields: "files(id, name, mimeType)",
//       supportsAllDrives: true,
//     });

//     const files = (res.data.files || []).map((f) => ({
//       id: f.id,
//       name: f.name,
//       mimeType: f.mimeType,
//       viewUrl: `https://drive.google.com/uc?export=view&id=${f.id}`,
//     }));

//     return new Response(JSON.stringify({ category: cat.title, files }), { status: 200 });
//   } catch (error) {
//     console.error("🔥 Error in category fetch:", error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }


import { google } from "googleapis";
import fs from "fs";
import path from "path";

// Load categories from JSON
const categoriesPath = path.join(process.cwd(), "src/data/categories.json");
const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));

// OAuth setup
const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

export async function GET(request, context) {
  try {
    // ✅ Fix for Next.js 15+: await params
    const { category } = await context.params;

    // 🔹 Find category info from local JSON
    const cat = categories.find((c) => c.id === category);
    if (!cat) {
      return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 });
    }

    // 🔒 Check if Google token exists
    if (!fs.existsSync(tokenPath)) {
      return new Response("❌ Google tokens not found. Please reconnect Drive.", { status: 401 });
    }

    // 🔑 Load saved OAuth tokens
    const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    oauth2Client.setCredentials(tokens);
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // 🔍 Query Google Drive files for that category
    const mimeFilter = cat.type === "video" ? "mimeType contains 'video/'" : "mimeType contains 'image/'";
    const q = `'${cat.folderId}' in parents and ${mimeFilter}`;
    const res = await drive.files.list({
      q,
      fields: "files(id, name, mimeType)",
      supportsAllDrives: true,
    });

    // 🗂️ Map file data for frontend
    const files = (res.data.files || []).map((f) => ({
      id: f.id,
      name: f.name,
      mimeType: f.mimeType,
      viewUrl: `https://drive.google.com/uc?export=view&id=${f.id}`,
    }));

    return new Response(JSON.stringify({ category: cat.title, files }), { status: 200 });
  } catch (error) {
    console.error("🔥 Error in category fetch:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
