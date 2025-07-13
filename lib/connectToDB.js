import mongoose from "mongoose";

export const connectToDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "tunetic",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw new Error("Failed to connect to MongoDB");
  }
};
