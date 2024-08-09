"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
const account = (0, accounts_1.privateKeyToAccount)("0x8393e9c90d605f0274dd460f3a82fa00c7ff107e6ef0731c6cd11ff9ece83d83");
exports.client = (0, viem_1.createWalletClient)({
    account,
    chain: chains_1.polygon,
    transport: (0, viem_1.http)(),
});
