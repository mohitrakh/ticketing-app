import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_key is not define");
    }
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
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
