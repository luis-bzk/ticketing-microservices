import express, { Request, Response } from "express";

import "express-async-errors";
import { NotFoundError, errorHandler } from "@lbc-ticketing/common";

import cookieSession from "cookie-session";
import { currentUserRouter, signInRouter, signOutRouter, signUpRouter } from "./routes";

const app = express();

app.set("trust proxy", true);

// middleware JSON
app.use(express.json());

// cookies session
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// routes - endpoints
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", async (_req: Request, _res: Response) => {
  throw new NotFoundError();
});

// middleware error handler
app.use(errorHandler);

export default app;
