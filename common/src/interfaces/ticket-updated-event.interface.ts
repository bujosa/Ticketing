import { Subjects } from "../enums/subjects";

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    user: string;
    version: number;
    order?: string;
  };
}
