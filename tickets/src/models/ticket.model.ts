import { Schema, model } from "mongoose";
import { ITicketDoc, ITicket, ITicketModel } from "../interfaces";

// type TTicketModel = Model<ITicketDoc, {}, ITicketModel>;
const ticketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (ticketObj: ITicket) => {
  return new TicketModel(ticketObj);
};

const TicketModel = model<ITicketDoc, ITicketModel>("Ticket", ticketSchema);

export { TicketModel };
