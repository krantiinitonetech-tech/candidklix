// import { google } from "googleapis";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

// function getAuthUrl() {
//   const scopes = ["https://www.googleapis.com/auth/drive.readonly"];
//   return oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     prompt: "consent",
//     scope: scopes,
//   });
// }

// async function setCredentialsFromFile() {
//   if (fs.existsSync(tokenPath)) {
//     const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
//     oauth2Client.setCredentials(tokens);
//     return true;
//   }
//   return false;
// }

// export async function GET(req) {
//   const url = new URL(req.url);
//   const code = url.searchParams.get("code");

//   try {
//     // 1️⃣ Try loading saved tokens
//     const hasTokens = await setCredentialsFromFile();

//     // 2️⃣ If we have no code and no tokens → show auth URL
//     if (!code && !hasTokens) {
//       const authUrl = getAuthUrl();
//       return Response.json({ authUrl });
//     }

//     // 3️⃣ If we have a new code → exchange and save tokens
//     if (code) {
//       const { tokens } = await oauth2Client.getToken(code);
//       oauth2Client.setCredentials(tokens);
//       fs.writeFileSync(tokenPath, JSON.stringify(tokens));
//       console.log("✅ Tokens saved to", tokenPath);
//     }

//     // 4️⃣ Use Drive API
//     const drive = google.drive({ version: "v3", auth: oauth2Client });
//     const response = await drive.files.list({
//       q: `'${process.env.GOOGLE_FOLDER_ID}' in parents and (mimeType contains 'image/' or mimeType contains 'video/')`,
//       fields: "files(id, name, mimeType, thumbnailLink, webViewLink)",
//     });

//     console.log("Drive API files:", response.data.files);

//     return Response.json({ files: response.data.files });
//   } catch (error) {
//     console.error("Drive API error:", error);
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }

// Working code

// import { google } from "googleapis";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

// function getAuthUrl() {
//   const scopes = ["https://www.googleapis.com/auth/drive.readonly"];
//   return oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     prompt: "consent",
//     scope: scopes,
//   });
// }

// async function setCredentialsFromFile() {
//   if (fs.existsSync(tokenPath)) {
//     const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
//     oauth2Client.setCredentials(tokens);
//     return true;
//   }
//   return false;
// }

// export async function GET(req) {
//   const url = new URL(req.url);
//   const code = url.searchParams.get("code");

//   try {
//     const hasTokens = await setCredentialsFromFile();

//     if (!code && !hasTokens) {
//       const authUrl = getAuthUrl();
//       return Response.json({ authUrl });
//     }

//     if (code) {
//       const { tokens } = await oauth2Client.getToken(code);
//       oauth2Client.setCredentials(tokens);
//       fs.writeFileSync(tokenPath, JSON.stringify(tokens));
//     }

//     const drive = google.drive({ version: "v3", auth: oauth2Client });

//     const response = await drive.files.list({
//       q: `'${process.env.GOOGLE_FOLDER_ID}' in parents and (mimeType contains 'image/' or mimeType contains 'video/')`,
//       fields: "files(id, name, mimeType, webViewLink)",
//       supportsAllDrives: true,
//     });

//     return Response.json({ files: response.data.files });
//   } catch (error) {
//     console.error("Drive API error:", error);
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }



//New code
// import { google } from "googleapis";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

// function getAuthUrl() {
//   const scopes = ["https://www.googleapis.com/auth/drive.readonly"];
//   return oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     prompt: "consent",
//     scope: scopes,
//   });
// }

// async function setCredentialsFromFile() {
//   if (fs.existsSync(tokenPath)) {
//     try {
//       const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
//       oauth2Client.setCredentials(tokens);
      
//       // Check if token needs refresh
//       if (tokens.expiry_date && tokens.expiry_date < Date.now()) {
//         console.log("🔄 Refreshing expired token...");
//         const { credentials } = await oauth2Client.refreshAccessToken();
//         oauth2Client.setCredentials(credentials);
//         fs.writeFileSync(tokenPath, JSON.stringify(credentials));
//         console.log("✅ Token refreshed and saved");
//       }
      
//       return true;
//     } catch (err) {
//       console.error("❌ Error loading tokens:", err);
//       return false;
//     }
//   }
//   return false;
// }

// export async function GET(req) {
//   const url = new URL(req.url);
//   const code = url.searchParams.get("code");

//   try {
//     // 1️⃣ Try loading saved tokens
//     const hasTokens = await setCredentialsFromFile();

//     // 2️⃣ If we have no code and no tokens → show auth URL
//     if (!code && !hasTokens) {
//       const authUrl = getAuthUrl();
//       return Response.json({ authUrl });
//     }

//     // 3️⃣ If we have a new code → exchange and save tokens
//     if (code) {
//       const { tokens } = await oauth2Client.getToken(code);
//       oauth2Client.setCredentials(tokens);
//       fs.writeFileSync(tokenPath, JSON.stringify(tokens));
//       console.log("✅ Tokens saved to", tokenPath);
//     }

//     // 4️⃣ Use Drive API - fetch metadata only (not thumbnailLink)
//     const drive = google.drive({ version: "v3", auth: oauth2Client });
//     const response = await drive.files.list({
//       q: `'${process.env.GOOGLE_FOLDER_ID}' in parents and (mimeType contains 'image/' or mimeType contains 'video/')`,
//       fields: "files(id, name, mimeType, modifiedTime)",
//       orderBy: "createdTime desc", // Optional: show newest first
//     });

//     return Response.json({ files: response.data.files });
//   } catch (error) {
//     console.error("Drive API error:", error);
    
//     // If auth error, clear tokens and return auth URL
//     if (error.code === 401 || error.code === 403) {
//       if (fs.existsSync(tokenPath)) {
//         fs.unlinkSync(tokenPath);
//       }
//       const authUrl = getAuthUrl();
//       return Response.json({ authUrl, error: "Authentication required" }, { status: 401 });
//     }
    
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }

// import { google } from "googleapis";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const auth = new google.auth.GoogleAuth({
//     credentials: {
//       client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET,
//       redirect_uris: [process.env.GOOGLE_REDIRECT_URI],
//     },
//     scopes: ["https://www.googleapis.com/auth/drive.readonly"],
//   });

//   const drive = google.drive({ version: "v3", auth });
//   const res = await drive.files.list({
//     q: "'1yDZ5emsKxSr6vrl-ihAFox0mjLA76xLT' in parents and mimeType contains 'image/'",
//     fields: "files(id,name)",
//   });

//   return NextResponse.json(res.data);
// }




// import { google } from "googleapis";
// import fs from "fs";
// import path from "path";

// const TOKEN_PATH = path.join(process.cwd(), "src/lib/googleTokens.json");
// const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

// export async function GET() {
//   try {
//     const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
//     const { client_id, client_secret, redirect_uris } = credentials.web;

//     const oAuth2Client = new google.auth.OAuth2(
//       client_id,
//       client_secret,
//       redirect_uris[0]
//     );

//     const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
//     oAuth2Client.setCredentials(token);

//     const drive = google.drive({ version: "v3", auth: oAuth2Client });

//     const res = await drive.files.list({
//       q: "mimeType contains 'image/'",
//       fields: "files(id, name, mimeType, webViewLink)",
//     });

//     const files = res.data.files || [];

//     const formatted = files.map((file) => ({
//       id: file.id,
//       name: file.name,
//       mimeType: file.mimeType,
//       imageUrl: `https://drive.google.com/uc?export=view&id=${file.id}`,
//       viewUrl: file.webViewLink,
//     }));

//     return Response.json({ files: formatted });
//   } catch (error) {
//     console.error("Drive Fetch Error:", error);
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }

// import { google } from "googleapis";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");
// const categoriesPath = path.join(process.cwd(), "src/data/categories.json");
// const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));

// export async function GET() {
//   try {
//     if (!fs.existsSync(tokenPath)) {
//       return new Response("Google tokens missing", { status: 401 });
//     }

//     const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf8"));

//     const oauth2Client = new google.auth.OAuth2(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET,
//       process.env.GOOGLE_REDIRECT_URI
//     );

//     oauth2Client.setCredentials(tokens);
//     const drive = google.drive({ version: "v3", auth: oauth2Client });

//     let allFiles = [];

//     for (const cat of categories) {
//       const mimeFilter = cat.type === "video"
//         ? "mimeType contains 'video/'"
//         : "mimeType contains 'image/'";

//       const q = `'${cat.folderId}' in parents and ${mimeFilter}`;
//       const res = await drive.files.list({
//         q,
//         fields: "files(id,name,mimeType)",
//         supportsAllDrives: true
//       });

//       const files = (res.data.files || []).map(f => ({
//         id: f.id,
//         name: f.name,
//         mimeType: f.mimeType,
//         category: cat.title
//       }));

//       allFiles = [...allFiles, ...files];
//     }

//     return new Response(JSON.stringify({ files: allFiles }), { status: 200 });
//   } catch (e) {
//     console.error(e);
//     return new Response(e.message, { status: 500 });
//   }
// }

import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const scopes = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/drive.metadata.readonly"
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes
  });

  return NextResponse.redirect(url);
}
