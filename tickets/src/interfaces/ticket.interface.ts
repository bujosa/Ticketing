import mongoose from "mongoose";

export interface ITicket {
  title: string;
  price: number;
  user: string;
  version: number;
}

export interface ITicketDoc extends mongoose.Document {
  title: string;
  price: number;
  user: string;
}

export interface ITicketModel extends mongoose.Model<ITicketDoc> {
  build(ticket: ITicket): ITicketDoc;
}
