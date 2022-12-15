import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors";

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ errors: error.serializeErrors() });
  }

  return res.status(500).json({ errors: [{ message: "Something went wrong" }] });
};
