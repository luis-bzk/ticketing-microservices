import mongoose from "mongoose";

export interface ITicket {
  title: string;
  price: number;
  userId: string;
}

export interface ITicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

export interface ITicketModel extends mongoose.Model<ITicketDoc> {
  build(ticketObj: ITicket): ITicketDoc;
}
