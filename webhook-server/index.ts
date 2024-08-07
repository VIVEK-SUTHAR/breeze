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

const PORT = 3000;

const app = express();
initializeHashMap();
app.use(bodyParser.json());

app.post("/webhook", (req: Request, res: Response) => {
  registerLimitOrder(req, res);
});

app.listen(PORT, () => {
  console.log(`WebHook server is running on port ${PORT}`);
});
