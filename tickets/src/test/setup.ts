import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
// import request from "supertest";
// import app from "../app";

// import app from "../app";

declare global {
  var signUpGetCookie: () => string[];
  var signUpUser2: () => string[];
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "hiu4h9yvs98ah34iah8bfl34oi9II34O087";

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signUpGetCookie = () => {
  // Build JWTpayload {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "email@email.com",
  };

  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object {jwt: userJWT}
  const session = { jwt: token };

  // Turn session to JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return string = cookie
  return [`session=${base64}`];
};

global.signUpUser2 = () => {
  // Build JWTpayload {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString,
    email: "email@email.com",
  };

  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object {jwt: userJWT}
  const session = { jwt: token };

  // Turn session to JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return string = cookie
  return [`session=${base64}`];
};
