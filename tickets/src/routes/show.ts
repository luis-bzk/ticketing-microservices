import express, { Request, Response } from "express";

import { TicketModel } from "../models";
import { BadRequestError, NotFoundError } from "@lbc-ticketing/common";
import { isValidObjectId } from "mongoose";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    throw new BadRequestError("This id is invalid");
  }

  const ticket = await TicketModel.findById(id);

  if (!ticket) {
    throw new NotFoundError();
  }

  return res.status(200).json(ticket);
});

export { router as showTicketRouter };
