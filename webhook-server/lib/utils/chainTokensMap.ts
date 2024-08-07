import fs from "fs";
import path from "path";
import { WebhookEvent } from "../types/EventData";
import { log } from "console";

type Token = {
  pythSymbol: string;
  id: string;
  symbol: string;
  name: string;
  address: string;
};

const DIRNAME = path.join(__dirname, "../../../pyth-socket-pricefeed-scrapper");

const readJsonFile = (filePath: string): Token[] => {
  const rawData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(rawData) as Token[];
};

const createGlobalHashMap = (chainDataFiles: {
  [key: string]: string;
}): Map<string, string> => {
  const globalHashMap = new Map<string, string>();

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

const chainDataFiles: { [key: string]: string } = {
  "10": path.join(DIRNAME, "SupportedTokens-10.json"),
  "137": path.join(DIRNAME, "SupportedTokens-137.json"),
  "34443": path.join(DIRNAME, "SupportedTokens-34443.json"),
  "8453": path.join(DIRNAME, "SupportedTokens-8453.json"),
};

let globalHashMap: Map<string, string> | null = null;

export const initializeHashMap = () => {
  globalHashMap = createGlobalHashMap(chainDataFiles);
  console.log("[INIT]:PythID<>SocketTokens Map");
};

export const buildIdFromEventData = (
  eventData: WebhookEvent,
): string | undefined => {
  const sourceChain = eventData.data.new.source_chain;
  const address = eventData.data.new.source_token;
  const key = `${sourceChain}-${address}`;
  return key;
};

export const getHashMap = (): Map<string, string> | null => globalHashMap;
