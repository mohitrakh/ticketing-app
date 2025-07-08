import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "@mohittickets/common";
const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response, next: NextFunction) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
