// app/api/search/route.js
import { NextResponse } from "next/server";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = null;
let tokenExpiry = 0;

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiry) return accessToken;

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Token fetch failed:", err);
    throw new Error("Failed to get access token from Spotify");
  }

  const data = await res.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000;
  return accessToken;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      console.log("❌ No query provided.");
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    console.log("🔍 Searching for:", query);

    const token = await getAccessToken();
    console.log("✅ Got token:", token.substring(0, 10) + "...");

    const result = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("📡 Spotify API response status:", result.status);

    const data = await result.json();
    console.log("🎵 Got tracks:", data.tracks?.items?.length ?? 0);

    if (!data.tracks || !Array.isArray(data.tracks.items)) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data.tracks.items);
  } catch (error) {
    console.error("💥 Spotify search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

