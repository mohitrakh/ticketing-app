import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@mohittickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
