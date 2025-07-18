import { randomBytes } from "crypto";
import nats, { Message } from "node-nats-streaming";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Connected to NATS");

  const options = stan.subscriptionOptions().setManualAckMode(true);

  // Subscribe to the "ticket:created" subject
  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );

  subscription.on("message", (msg: Message) => {
    console.log(
      "Received a message on 'ticket:created'",
      msg.getData(),
      msg.getSequence()
    );
    msg.ack();
  });
});
