import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

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
