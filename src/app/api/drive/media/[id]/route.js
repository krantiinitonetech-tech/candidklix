// import { google } from "googleapis";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// async function getAuthClient() {
//   const credentials = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
//   const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.GOOGLE_REDIRECT_URI
//   );
//   oauth2Client.setCredentials(credentials);
//   return oauth2Client;
// }

// export async function GET(req, { params }) {
//   const { id } = params;

//   try {
//     const auth = await getAuthClient();
//     const drive = google.drive({ version: "v3", auth });

//     // Fetch file metadata
//     const { data: file } = await drive.files.get({
//       fileId: id,
//       fields: "name, mimeType",
//       supportsAllDrives: true,
//     });

//     // Fetch file content as a stream
//     const response = await drive.files.get(
//       { fileId: id, alt: "media", supportsAllDrives: true },
//       { responseType: "stream" }
//     );

//     const stream = response.data;

//     return new Response(stream, {
//       headers: {
//         "Content-Type": file.mimeType,
//         "Content-Disposition": `inline; filename="${file.name}"`,
//       },
//     });
//   } catch (error) {
//     console.error("Media fetch error:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// }


// import { google } from "googleapis";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// export async function GET(req, { params }) {
//   const { id } = params;

//   try {
//     // Load saved tokens
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

//     // Use Drive API
//     const drive = google.drive({ version: "v3", auth: oauth2Client });

//     // ✅ Get file metadata (to check type)
//     const { data: file } = await drive.files.get({
//       fileId: id,
//       fields: "mimeType, name",
//       supportsAllDrives: true,
//     });

//     // ✅ Get file content as stream
//     const response = await drive.files.get(
//       {
//         fileId: id,
//         alt: "media",
//       },
//       { responseType: "stream" }
//     );

//     // ✅ Convert stream → Response
//     const stream = response.data;
//     const chunks = [];
//     for await (const chunk of stream) {
//       chunks.push(chunk);
//     }
//     const buffer = Buffer.concat(chunks);

//     return new Response(buffer, {
//       headers: {
//         "Content-Type": file.mimeType,
//         "Content-Disposition": `inline; filename="${file.name}"`,
//       },
//     });
//   }} catch (error) {
//     console.error("🔥 Error serving Drive media:", error);
    
//     // Log deeper Google API details if available
//     if (error.errors) {
//       console.error("🔍 Drive API details:", JSON.stringify(error.errors, null, 2));
//     }
    
//     return new Response(`Error: ${error.message}`, { status: 500 });
//   }

// import { google } from "googleapis";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// export async function GET(req, { params }) {
//   const { id } = params;

//   try {
//     // Load saved tokens
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

//     // Use Drive API
//     const drive = google.drive({ version: "v3", auth: oauth2Client });

//     // ✅ Get file metadata (to check type)
//     const { data: file } = await drive.files.get({
//       fileId: id,
//       fields: "mimeType, name",
//       supportsAllDrives: true,
//     });

//     // ✅ Get file content as stream
//     const response = await drive.files.get(
//       {
//         fileId: id,
//         alt: "media",
//       },
//       { responseType: "stream" }
//     );

//     // ✅ Convert stream → Response
//     const stream = response.data;
//     const chunks = [];
//     for await (const chunk of stream) {
//       chunks.push(chunk);
//     }
//     const buffer = Buffer.concat(chunks);

//     return new Response(buffer, {
//       headers: {
//         "Content-Type": file.mimeType,
//         "Content-Disposition": `inline; filename="${file.name}"`,
//       },
//     });

//   } catch (error) {
//     console.error("🔥 Error serving Drive media:", error);

//     // Log deeper Google API details if available
//     if (error.errors) {
//       console.error("🔍 Drive API details:", JSON.stringify(error.errors, null, 2));
//     }

//     return new Response(`Error: ${error.message}`, { status: 500 });
//   }
// }


// import { google } from "googleapis";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// export async function GET(req, { params }) {
//   const { id } = params; // ✅ works fine in API routes

//   try {
//     // Load saved tokens
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

//     // Use Drive API
//     const drive = google.drive({ version: "v3", auth: oauth2Client });

//     // ✅ Get file metadata (to check type)
//     const { data: file } = await drive.files.get({
//       fileId: id,
//       fields: "mimeType, name",
//       supportsAllDrives: true,
//     });

//     // ✅ Get file content as stream
//     const response = await drive.files.get(
//       {
//         fileId: id,
//         alt: "media",
//       },
//       { responseType: "stream" }
//     );

//     // ✅ Convert stream → Response
//     const stream = response.data;
//     const chunks = [];
//     for await (const chunk of stream) {
//       chunks.push(chunk);
//     }
//     const buffer = Buffer.concat(chunks);

//     return new Response(buffer, {
//       headers: {
//         "Content-Type": file.mimeType,
//         "Content-Disposition": `inline; filename="${file.name}"`,
//       },
//     });
//   } catch (error) {
//     console.error("🔥 Error serving Drive media:", error);

//     // Log deeper Google API details if available
//     if (error.errors) {
//       console.error("🔍 Drive API details:", JSON.stringify(error.errors, null, 2));
//     }

//     return new Response(`Error: ${error.message}`, { status: 500 });
//   }
// }

// import { google } from "googleapis";
// import fs from "fs";
// import path from "path";

// const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

// export async function GET(...args) {
//   // ✅ Unwrap both req and context safely
//   const [req, context] = await Promise.all(args.map(p => Promise.resolve(p)));
//   const { params } = await Promise.resolve(context);
//   const id = params?.id;

//   try {
//     if (!id) {
//       return new Response("❌ Missing file ID", { status: 400 });
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

//     // ✅ Get file metadata
//     const { data: file } = await drive.files.get({
//       fileId: id,
//       fields: "mimeType, name",
//       supportsAllDrives: true,
//     });

//     // ✅ Get file stream
//     const response = await drive.files.get(
//       { fileId: id, alt: "media" },
//       { responseType: "stream" }
//     );

//     const stream = response.data;
//     const chunks = [];
//     for await (const chunk of stream) chunks.push(chunk);
//     const buffer = Buffer.concat(chunks);

//     return new Response(buffer, {
//       headers: {
//         "Content-Type": file.mimeType,
//         "Content-Disposition": `inline; filename="${file.name}"`,
//       },
//     });
//   } catch (error) {
//     console.error("🔥 Error serving Drive media:", error);
//     if (error.errors)
//       console.error("🔍 Drive API details:", JSON.stringify(error.errors, null, 2));

//     return new Response(`Error: ${error.message}`, { status: 500 });
//   }
// }

import { google } from "googleapis";
import fs from "fs";
import path from "path";

const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");

export async function GET(request, context) {
  const params = await context.params; // ✅ unwrap for Next.js 15
  const { id } = params;

  try {
    if (!id) {
      return new Response("❌ Missing file ID", { status: 400 });
    }

    if (!fs.existsSync(tokenPath)) {
      return new Response("❌ Google tokens not found. Please reconnect Drive.", { status: 401 });
    }

    const tokens = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    oauth2Client.setCredentials(tokens);

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const { data: file } = await drive.files.get({
      fileId: id,
      fields: "mimeType, name",
      supportsAllDrives: true,
    });

    const response = await drive.files.get(
      { fileId: id, alt: "media", supportsAllDrives: true },
      { responseType: "stream" }
    );

    const stream = response.data;
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `inline; filename="${file.name}"`,
      },
    });
  } catch (error) {
    console.error("🔥 Error serving Drive media:", error);
    if (error.errors)
      console.error("🔍 Drive API details:", JSON.stringify(error.errors, null, 2));

    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
