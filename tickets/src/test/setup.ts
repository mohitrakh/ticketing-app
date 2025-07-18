import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";
declare global {
  var signin: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "test123";
  mongo = await MongoMemoryServer.create({
    binary: {
      systemBinary: "C:\\Program Files\\MongoDB\\Server\\8.0\\bin\\mongod.exe",
    },
  });

  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
}, 30000);

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  if (!collections) return;
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

global.signin = async () => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: "1lk24j124l",
    email: "test@test.com",
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
