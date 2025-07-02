import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
const app = express();

app.use(json());
app.use(
  cookieSession({
    signed: false, // disable the encryption
    secure: false, // only accepts cookie from the https
  }) // TODO: change this secure with env file
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("/{*any}", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

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
