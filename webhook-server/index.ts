import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { setupWatcher } from "./lib/priceWatch";
import { addListener } from "process";
import { WebhookEvent } from "./lib/types/EventData";

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.post("/webhook", (req: Request, res: Response) => {
  console.log("Webhook", req.body);
  const eventData = req.body as WebhookEvent;
  setupWatcher({
    priceToWatch: 78,
    tokenToWatch:
      "2b9ab1e972a281585084148ba1389800799bd4be63b957507db1349314e47445",
    onPriceReached: () => {
      console.log("Price reached");
      console.log("Token Params", eventData);
    },
  });
  res.status(200).send("Webhook received");
});

app.listen(PORT, () => {
  console.log(`WebHook server is running on port ${PORT}`);
});
