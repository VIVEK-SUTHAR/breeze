import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { setupWatcher } from "./lib/priceWatch";
import { addListener } from "process";
import { WebhookEvent } from "./lib/types/EventData";
import fetchTxnData from "./lib/api/socket.api";
import executeTrade from "./lib/utils/excuteTrade";
import {
  buildIdFromEventData,
  getHashMap,
  initializeHashMap,
} from "./lib/utils/chainTokensMap";
import { registerLimitOrder } from "./lib/limit-order";
import { DCAEngine } from "./lib/dca";

import { v4 as uuidv4 } from "uuid";
const PORT = 3000;

const app = express();
initializeHashMap();
app.use(bodyParser.json());

const dcaEngine = new DCAEngine();

app.post("/webhook", (req: Request, res: Response) => {
  registerLimitOrder(req, res);
});

app.post("/dca-webhook", (req: Request, res: Response) => {
  dcaEngine.scheduleJob({
    jobId: uuidv4(),
    tokenSymbol: "ETH",
    contractAddress: "0x...",
    totalAmount: 200,
    numberOfOrders: 3,
    cronSchedule: "1 MIN",
  });
  res.status(200).send("DCA Webhook received");
});

app.listen(PORT, () => {
  console.log(`WebHook server is running on port ${PORT}`);
});
