import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { IUserPayload } from "../interfaces";

export const currentUser = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as IUserPayload;
    req.currentUser = payload;
  } catch (error) {
    console.log(error);
  }

  next();
};
