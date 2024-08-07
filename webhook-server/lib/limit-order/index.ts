import { Request, Response } from "express";
import { WebhookEvent } from "../types/EventData";
import { buildIdFromEventData, getHashMap } from "../utils/chainTokensMap";
import { setupWatcher } from "../priceWatch";
import fetchTxnData from "../api/socket.api";
import executeTrade from "../utils/excuteTrade";

export function registerLimitOrder(req: Request, res: Response) {
  const eventData = req.body as WebhookEvent;
  const hashmap = getHashMap();
  const key = buildIdFromEventData(eventData);
  if (!key) {
    res.status(200).send("Webhook received");
    return;
  }
  console.log("PythID for token", hashmap?.get(key));
  const pythId = hashmap?.get("137-0x7ceb23fd6bc0add59e62ac25578270cff1b9f619");
  if (!pythId) {
    res.status(200).send("Webhook received");
    return;
  }
  setupWatcher({
    priceToWatch: parseFloat(eventData.data.new.target_price),
    tokenToWatch: pythId,
    onPriceReached: async () => {
      console.log("Price reached");
      const txnData = await fetchTxnData(
        eventData.data.new.source_chain,
        eventData.data.new.dest_chain,
        eventData.data.new.source_token,
        eventData.data.new.dest_token,
        eventData.data.new.amount,
        eventData.data.new.user,
      );

      console.log("txnData", txnData);

      //To-Do: Use TxnData to Call Contract from EOA.

      if (txnData) {
        await executeTrade(txnData, eventData.data.new.transfer_id);
      }
    },
  });
  res.status(200).send("Webhook received");
}
