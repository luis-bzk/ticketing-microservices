import express, { Request, Response } from "express";

// import jwt from "jsonwebtoken";
const router = express.Router();

import { currentUser } from "../middlewares";

router.get("/api/users/current-user", currentUser, (req: Request, res: Response) => {
  res.status(200).json({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
