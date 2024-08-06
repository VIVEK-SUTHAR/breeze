import { client } from ".";
import { abi, BREEZEGATEWAYADDRESS } from "../constants";
import { SocketTx } from "../types/Socket";

export default async function executeTrade(
  txnData: SocketTx,
  transferId: string
) {
  try {
    if (txnData.approvalData) {
      console.log("erc20 trade");
      return;
    }
    console.log("native trade");
    const hash = await client.writeContract({
      abi,
      address: BREEZEGATEWAYADDRESS,
      functionName: "contractCallNativeToken",
      args: [txnData.txTarget, txnData.txData, txnData.value, transferId],
    });
    console.log("txn hash", hash);
  } catch (error) {
    console.log("error excuting trade", error);
  }
}
