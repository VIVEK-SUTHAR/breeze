import { client } from ".";
import { abi, BREEZEGATEWAYADDRESSPOLYGON } from "../constants";
import { SocketTx } from "../types/Socket";

export default async function executeTrade(
  txnData: SocketTx,
  transferId: string
) {
  try {
    if (txnData.approvalData) {
      console.log("erc20 trade");
      const hash = await client.writeContract({
        abi,
        address: BREEZEGATEWAYADDRESSPOLYGON,
        functionName: "contractCallERC20",
        args: [
          txnData.txTarget,
          txnData.txData,
          txnData.approvalData.approvalTokenAddress,
          txnData.approvalData.allowanceTarget,
          txnData.approvalData.minimumApprovalAmount,
          transferId,
        ],
      });
      console.log("txn hash", hash);
      return;
    }
    console.log("native trade");
    const hash = await client.writeContract({
      abi,
      address: BREEZEGATEWAYADDRESSPOLYGON,
      functionName: "contractCallNativeToken",
      args: [txnData.txTarget, txnData.txData, txnData.value, transferId],
    });
    console.log("txn hash", hash);
  } catch (error) {
    console.log("error excuting trade", error);
  }
}
