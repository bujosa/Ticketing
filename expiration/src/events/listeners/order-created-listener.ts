import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from "@ticketing-bujosa/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queues";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    await expirationQueue.add({
      order: data.id,
    });

    msg.ack();
  }
}
