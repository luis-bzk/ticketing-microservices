import http from "http";
import app from "./app";
import dotenv from "dotenv";

import { connectDB } from "./config";

// environment variables
dotenv.config();

// port
const PORT = 3000;

// server http
const server = http.createServer(app);

async function startServer() {
  // env variables
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  // connect database
  await connectDB();

  // start server
  server.listen(PORT, () => {
    console.log(`Listening in port: ${PORT}`);
  });
}

startServer();
