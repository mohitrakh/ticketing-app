import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "test@123";
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
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie as string[];
};
