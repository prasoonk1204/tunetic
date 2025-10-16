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

    const dbUser = await User.findById(session.user.id);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let existing = await Song.findOne({ spotifyUrl: body.spotifyUrl });

    if (existing) {
      const alreadySuggested = existing.suggestedBy.some(
        (u) => u.userId.toString() === dbUser._id.toString(),
      );

      if (alreadySuggested) {
        return NextResponse.json(
          { error: "You already suggested this song" },
          { status: 409 },
        );
      }

      existing.suggestedBy.push({
        userId: dbUser._id,
        username: dbUser.username,
      });

      await existing.save();
      return NextResponse.json(existing, { status: 200 });
    }

    const newSong = await Song.create({
      name: body.name,
      album: body.album,
      albumArt: body.albumArt,
      artists: body.artists,
      spotifyUrl: body.spotifyUrl,
      suggestedBy: [
        {
          userId: dbUser._id,
          username: dbUser.username,
        },
      ],
    });

    return NextResponse.json(newSong, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to suggest song:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request) {
  await connectToDB();

  const { searchParams } = new URL(request.url);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  try {
    const songs = await Song.find({})
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ songs }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch songs:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
