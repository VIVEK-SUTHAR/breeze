"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashMap = exports.buildIdFromEventData = exports.initializeHashMap = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const isProd = process.env.NODE_ENV === "production";
const DIRNAME = path_1.default.join(__dirname, !isProd
    ? "../../../pyth-socket-pricefeed-scrapper"
    : "../../../../pyth-socket-pricefeed-scrapper");
const readJsonFile = (filePath) => {
    const rawData = fs_1.default.readFileSync(filePath, "utf8");
    return JSON.parse(rawData);
};
const createGlobalHashMap = (chainDataFiles) => {
    const globalHashMap = new Map();
    for (const [chainId, filePath] of Object.entries(chainDataFiles)) {
        const data = readJsonFile(filePath);
        data.forEach((item) => {
            const key = `${chainId}-${item.address}`;
            const value = item.id;
            globalHashMap.set(key, value);
        });
    }
    return globalHashMap;
};
const chainDataFiles = {
    "10": path_1.default.join(DIRNAME, "SupportedTokens-10.json"),
    "137": path_1.default.join(DIRNAME, "SupportedTokens-137.json"),
    "34443": path_1.default.join(DIRNAME, "SupportedTokens-34443.json"),
    "8453": path_1.default.join(DIRNAME, "SupportedTokens-8453.json"),
};
let globalHashMap = null;
const initializeHashMap = () => {
    globalHashMap = createGlobalHashMap(chainDataFiles);
    console.log("[INIT]:PythID<>SocketTokens Map");
};
exports.initializeHashMap = initializeHashMap;
const buildIdFromEventData = (eventData) => {
    const sourceChain = eventData.data.new.source_chain;
    const address = eventData.data.new.source_token;
    const key = `${sourceChain}-${address}`;
    return key;
};
exports.buildIdFromEventData = buildIdFromEventData;
const getHashMap = () => globalHashMap;
exports.getHashMap = getHashMap;
