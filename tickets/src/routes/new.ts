import express, { Request, Response } from "express";

import { body } from "express-validator";
import { requireAuth, validateRequest } from "@lbc-ticketing/common";

import { TicketModel } from "../models";
import { ITicket } from "../interfaces";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("You need to set a title"),
    body("price").isFloat({ gt: 0 }).withMessage("You need to set a title"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body as ITicket;
    const userId = req.currentUser!.id;

    const ticket = TicketModel.build({
      title,
      price,
      userId,
    });

    await ticket.save();

    res.status(201).json(ticket);
  }
);

export { router as createTicketRouter };
