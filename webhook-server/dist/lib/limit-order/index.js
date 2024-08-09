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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLimitOrder = registerLimitOrder;
const chainTokensMap_1 = require("../utils/chainTokensMap");
const priceWatch_1 = require("../priceWatch");
const socket_api_1 = __importDefault(require("../api/socket.api"));
const excuteTrade_1 = __importDefault(require("../utils/excuteTrade"));
function registerLimitOrder(req, res) {
    const eventData = req.body;
    const hashmap = (0, chainTokensMap_1.getHashMap)();
    const key = (0, chainTokensMap_1.buildIdFromEventData)(eventData);
    if (!key) {
        res.status(200).send("Webhook received");
        return;
    }
    console.log("this is key", key);
    console.log("PythID for token", hashmap === null || hashmap === void 0 ? void 0 : hashmap.get(key));
    const pythId = hashmap === null || hashmap === void 0 ? void 0 : hashmap.get(key);
    console.log("this is pythId", pythId, eventData.data.new.target_price);
    if (!pythId) {
        res.status(200).send("Webhook received");
        return;
    }
    (0, priceWatch_1.setupWatcher)({
        priceToWatch: parseFloat(eventData.data.new.target_price),
        tokenToWatch: pythId,
        onPriceReached: () => __awaiter(this, void 0, void 0, function* () {
            console.log("Price reached");
            const txnData = yield (0, socket_api_1.default)(eventData.data.new.source_chain, eventData.data.new.dest_chain, eventData.data.new.source_token, eventData.data.new.dest_token, eventData.data.new.amount, eventData.data.new.user);
            console.log("txnData", txnData);
            //To-Do: Use TxnData to Call Contract from EOA.
            if (txnData) {
                yield (0, excuteTrade_1.default)(txnData, eventData.data.new.transfer_id);
            }
        }),
    });
    res.status(200).send("Webhook received");
}
