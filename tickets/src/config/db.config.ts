import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be defined");
    }
    const connection = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.connection.host}: ${connection.connection.port}`;
    console.log(`Connection successfully with Mongo Database in: ${url}`);
  } catch (error) {
    console.log(`error: ${error}`);
    process.exit(1);
  }
};
