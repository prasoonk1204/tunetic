import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    name: String,
    artists: String,
    album: String,
    albumArt: String,
    spotifyUrl: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: { type: String, required: true },
  },
  { timestamps: true }
);
  

export default mongoose.models.Song || mongoose.model("Song", SongSchema);