import express, { Request, Response } from "express";
import { currentUser } from "@lbc-ticketing/common";

// import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req: Request, res: Response) => {
  res.status(200).json({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
