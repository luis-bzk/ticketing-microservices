import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb://auth-mongo-srv:27017/authDB");
    const url = `${connection.connection.host}: ${connection.connection.port}`;
    console.log(`Connection successfully with Mongo Database in: ${url}`);
  } catch (error) {
    console.log(`error: ${error}`);
    process.exit(1);
  }
};
