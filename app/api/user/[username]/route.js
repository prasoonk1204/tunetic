import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/User";
import Song from "@/models/Song";

export async function GET(req, { params }) {
  const { username } = params;
  await connectToDB();

  const user = await User.findOne({ username });
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const songs = await Song.find({ username }).sort({ createdAt: -1 }).lean();

  return new Response(JSON.stringify({ user, songs }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
