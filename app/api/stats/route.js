import { connectToDB } from "@/lib/connectToDB";
import Song from "@/models/Song";
import User from "@/models/User";

export async function GET(request) {
  try {
    await connectToDB();

    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60, stale-while-revalidate=30",
    };

    const [totalUsers, totalSongs] = await Promise.all([
      User.countDocuments(),
      Song.countDocuments(),
    ]);

    const songs = await Song.find({}, { artists: 1 });

    const artistCounts = {};

    for (const song of songs) {
      const artistList = song.artists.split(",").map((a) => a.trim());
      for (const artist of artistList) {
        artistCounts[artist] = (artistCounts[artist] || 0) + 1;
      }
    }

    let topArtist = null;
    let maxArtistCount = 0;

    for (const [artist, count] of Object.entries(artistCounts)) {
      if (count > maxArtistCount) {
        topArtist = { name: artist, count };
        maxArtistCount = count;
      }
    }

    const [topTrending] = await Song.aggregate([
      {
        $project: {
          name: 1,
          suggestedCount: { $size: "$suggestedBy" },
        },
      },
      { $sort: { suggestedCount: -1 } },
      { $limit: 1 },
      {
        $project: {
          _id: 0,
          name: 1,
          count: "$suggestedCount",
        },
      },
    ]);

    return new Response(
      JSON.stringify({
        totalUsers,
        totalSongs,
        topArtist,
        trending: topTrending || null,
      }),
      { status: 200, headers },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
