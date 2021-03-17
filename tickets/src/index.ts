import mongoose from "mongoose";
import { app } from "./app";
import { natsWraper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await natsWraper.connect("ticketing", "dfrfrf", "http://nats-service:4222");
    natsWraper.client.on("close", () => {
      console.log("Nats Connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWraper.client.close());
    process.on("SIGTERM", () => natsWraper.client.close());

    await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {}

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

start();
