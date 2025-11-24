import { google } from "googleapis";
import fs from "fs";
import path from "path";

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Missing authorization code", { status: 400 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // ✅ Save tokens locally
    const tokenPath = path.join(process.cwd(), "src/lib/googleTokens.json");
    fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));

    console.log("✅ Google Drive tokens saved to", tokenPath);

    return new Response("✅ Google Drive connected successfully! You can close this tab.", {
      status: 200,
    });
  } catch (error) {
    console.error("OAuth2 callback error:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
