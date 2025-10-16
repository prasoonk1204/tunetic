import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    name: String,
    artists: String,
    album: String,
    albumArt: String,
    spotifyUrl: { type: String, required: true },
    suggestedBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        username: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Song || mongoose.model("Song", SongSchema);
