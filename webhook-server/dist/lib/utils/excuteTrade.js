"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = executeTrade;
const _1 = require(".");
const constants_1 = require("../constants");
function executeTrade(txnData, transferId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (txnData.approvalData) {
                console.log("erc20 trade");
                const hash = yield _1.client.writeContract({
                    abi: constants_1.abi,
                    address: constants_1.BREEZEGATEWAYADDRESS,
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
            const hash = yield _1.client.writeContract({
                abi: constants_1.abi,
                address: constants_1.BREEZEGATEWAYADDRESS,
                functionName: "contractCallNativeToken",
                args: [txnData.txTarget, txnData.txData, txnData.value, transferId],
            });
            console.log("txn hash", hash);
        }
        catch (error) {
            console.log("error excuting trade", error);
        }
    });
}
