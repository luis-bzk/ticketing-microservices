import express, { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import {
  requireAuth,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  validateRequest,
} from "@lbc-ticketing/common";
import { TicketModel } from "../models";
import { body } from "express-validator";
import { ITicket } from "../interfaces/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("You need to set a title"),
    body("price").isFloat({ gt: 0 }).withMessage("You need to set a title"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      throw new BadRequestError("This Id is invalid");
    }

    const ticket = await TicketModel.findById(id);
    if (!ticket) {
      throw new NotFoundError();
    }

    const userId = req.currentUser!.id;
    if (ticket.userId.toString() !== userId.toString()) {
      throw new NotAuthorizedError();
    }

    const { title, price } = req.body as ITicket;

    ticket.set({
      title,
      price,
    });

    await ticket.save();

    return res.status(200).json(ticket);
  }
);

export { router as updateTicketRouter };
