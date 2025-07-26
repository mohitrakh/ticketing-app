import { Publisher, Subjects, OrderCreatedEvent } from "@mohitrakhtt/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
