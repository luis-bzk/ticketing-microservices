import express, { Request, Response } from "express";

import "express-async-errors";
import { NotFoundError, errorHandler, currentUser } from "@lbc-ticketing/common";

import cookieSession from "cookie-session";
import { createTicketRouter, showAllTicketsRouter, showTicketRouter, updateTicketRouter } from "./routes";

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

// auth middlewares
app.use(currentUser);

// routes - endpoints
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(showAllTicketsRouter);
app.use(updateTicketRouter);

app.all("*", async (_req: Request, _res: Response) => {
  throw new NotFoundError();
});

// middleware error handler
app.use(errorHandler);

export default app;
