import fetchTxnData from "../api/socket.api";
import executeTrade from "./excuteTrade";

process.on("message", async (data: Record<string, any>) => {
  console.log("DCA Execute order:", data);
  const txnData = await fetchTxnData(
    data.fromChainId,
    data.toChainId,
    data.fromToken,
    data.toToken,
    data.amount,
    data.recepient,
  );
  console.log("txnData", txnData);
  if (txnData) {
    await executeTrade(txnData, data.transferId, parseInt(data.fromChainId));
    if (process.send) {
      process.send("EXE_SUCCESS");
    }
  }
});
