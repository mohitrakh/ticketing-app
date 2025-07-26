import { Publisher, Subjects, OrderCancelledEvent } from "@mohitrakhtt/common";

export class OrderCancelleddPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
