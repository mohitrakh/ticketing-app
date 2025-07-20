import { Publisher, Subjects, TicketCreatedEvent } from "@mohittickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
