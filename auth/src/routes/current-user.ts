import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get(
  "/api/users/currentuser",
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
      res.send({ currentUser: null });
    }

    try {
      const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
      res.status(200).json({ currentUser: payload });
    } catch (error) {
      console.log("Current user error:", error);
      res.send({ currentUser: null });
    }
  }
);

export { router as currentUserRouter };
