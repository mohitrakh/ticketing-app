import { Listener, Subjects, TicketCreatedEvent } from "@mohittickets/common";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = "dsfsd";
  onMessage(
    data: { id: string; title: string; price: number; userId: string },
    msg: Message
  ): void {}
}
