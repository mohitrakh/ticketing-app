import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().isEmpty().withMessage("Password cannot be empty!"),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    res.send("Hi there!");
  }
);

export { router as signinRouter };
