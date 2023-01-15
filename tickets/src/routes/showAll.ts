import express, { Request, Response } from "express";
import { TicketModel } from "../models";
// import { NotFoundError } from "@lbc-ticketing/common";

const router = express.Router();

router.get("/api/tickets", async (_req: Request, res: Response) => {
  const tickets = await TicketModel.find();

  // if (!tickets) {
  //   throw new NotFoundError();
  // }

  return res.status(200).json(tickets);
});

export { router as showAllTicketsRouter };
