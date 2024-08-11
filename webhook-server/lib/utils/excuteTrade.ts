import { client } from ".";
import { abi } from "../constants";
import { SocketTx } from "../types/Socket";
import getContractAddressFromSelectedChain from "./getContractAddressForChain";

export default async function executeTrade(
  txnData: SocketTx,
  transferId: string,
  chainId: number
) {
  try {
    if (txnData.approvalData) {
      console.log("erc20 trade");
      const hash = await client.writeContract({
        abi,
        address: getContractAddressFromSelectedChain(chainId),
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
      address: getContractAddressFromSelectedChain(chainId),
      functionName: "contractCallNativeToken",
      args: [txnData.txTarget, txnData.txData, txnData.value, transferId],
    });
    console.log("txn hash", hash);
  } catch (error) {
    console.log("error excuting trade", error);
  }
}
