"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const chainTokensMap_1 = require("./lib/utils/chainTokensMap");
const limit_order_1 = require("./lib/limit-order");
const dca_1 = require("./lib/dca");
const uuid_1 = require("uuid");
const PORT = 3000;
const app = (0, express_1.default)();
(0, chainTokensMap_1.initializeHashMap)();
app.use(body_parser_1.default.json());
const dcaEngine = new dca_1.DCAEngine();
app.post("/webhook", (req, res) => {
    (0, limit_order_1.registerLimitOrder)(req, res);
});
app.post("/dca-webhook", (req, res) => {
    dcaEngine.scheduleJob({
        jobId: (0, uuid_1.v4)(),
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
