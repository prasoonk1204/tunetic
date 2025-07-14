import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/connectToDB";
import Song from "@/models/Song";
import User from "@/models/User";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }  

  try {
    const body = await request.json();
    await connectToDB();

    const dbUser = await User.findOne({ providerAccountId: session.user.id });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existing = await Song.findOne({
      spotifyUrl: body.spotifyUrl,
      userId: dbUser._id,
    });

    if (existing) {
      return NextResponse.json(
        { error: "You already suggested this song" },
        { status: 409 }
      );
    }

    const newSong = await Song.create({
      name: body.name,
      album: body.album,
      albumArt: body.albumArt,
      artists: body.artists,
      spotifyUrl: body.spotifyUrl,
      userId: dbUser._id,
      username: dbUser.username,
    });

    return NextResponse.json(newSong, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to suggest song:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();

  const songs = await Song.find({}).sort({ createdAt: -1 }).lean();

  return NextResponse.json(songs, { status: 200 });
}
