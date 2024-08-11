import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, "./.env"),
});

import { DCAData, WebhookEvent } from "./lib/types/EventData";

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
  const limitOrderData = req.body.data.new as DCAData;
  dcaEngine.scheduleJob({
    jobId: uuidv4(),
    recepient: limitOrderData.user,
    fromChainId: limitOrderData.source_chain,
    toChainId: limitOrderData.dest_chain,
    fromToken: limitOrderData.source_token,
    toToken: limitOrderData.dest_token,
    totalAmount: parseFloat(limitOrderData.amount),
    numberOfOrders: parseFloat(limitOrderData.number_of_orders),
    cronSchedule: limitOrderData.interval,
    transferId: limitOrderData.transfer_id,
  });
  res.status(200).send("DCA Webhook received");
});

app.listen(PORT, () => {
  console.log(`WebHook server is running on port ${PORT}`);
});
