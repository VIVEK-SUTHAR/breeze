import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { setupWatcher } from "./lib/priceWatch";
import { addListener } from "process";
import { WebhookEvent } from "./lib/types/EventData";
import fetchTxnData from "./lib/api/socket.api";
import executeTrade from "./lib/utils/excuteTrade";

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.post("/webhook", (req: Request, res: Response) => {
  console.log("Webhook", req.body);
  const eventData = req.body as WebhookEvent;
  setupWatcher({
    priceToWatch: parseFloat(eventData.data.new.target_price),
    tokenToWatch:
      "2b9ab1e972a281585084148ba1389800799bd4be63b957507db1349314e47445",
    onPriceReached: async () => {
      console.log("Price reached");
      const txnData = await fetchTxnData(
        eventData.data.new.source_chain,
        eventData.data.new.dest_chain,
        eventData.data.new.source_token,
        eventData.data.new.dest_token,
        eventData.data.new.amount,
        eventData.data.new.user
      );

      console.log("txnData", txnData);

      //To-Do: Use TxnData to Call Contract from EOA.

      if (txnData) {
        await executeTrade(txnData, eventData.data.new.transfer_id);
      }
    },
  });
  res.status(200).send("Webhook received");
});

app.listen(PORT, () => {
  console.log(`WebHook server is running on port ${PORT}`);
});
