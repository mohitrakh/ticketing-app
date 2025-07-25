import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_key is not define");
    }
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not define");
    }
    console.log(process.env.MONGO_URI, "MONGO_URI");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connted to database");
  } catch (error) {
    console.log(error);
    console.log("Error while connecting to db");
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
