import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";

// import app from "../app";

declare global {
  var signUpGetCookie: () => Promise<string[]>;
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

global.signUpGetCookie = async () => {
  const email = "email@email.com";
  const password = "1234567";

  const response = await request(app).post("/api/users/sign-up").send({ email, password }).expect(201);

  const cookie = response.get("Set-Cookie");
  return cookie;
};
