import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to nats");

  let data = {
    id: 123,
    title: "ticket data",
    price: 23,
  };

  stan.publish("ticket:created", JSON.stringify(data), () => {
    console.log("This is callback is completely optional");
  });
});
