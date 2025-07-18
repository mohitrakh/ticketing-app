import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "def", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Connected to NATS");

  // Subscribe to the "ticket:created" subject
  const subscription = stan.subscribe("ticket:created");

  subscription.on("message", (msg) => {
    console.log("Received a message on 'ticket:created'");
  });
});
