import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@mohittickets/common";

const app = express();

app.use(json());
app.use(
  cookieSession({
    signed: false, // disable the encryption
    secure: false, // only accepts cookie from the https
  }) // TODO: change this secure with env file
);

app.all("/{*any}", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
