import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    username: String,
    image: String,
    provider: String,
    providerAccountId: String,
  },
  { timestamps: true }
);

UserSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
