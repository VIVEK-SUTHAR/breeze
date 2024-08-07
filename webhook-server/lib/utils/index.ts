import { createWalletClient, custom, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet, optimism, polygonAmoy, polygon } from "viem/chains";

const account = privateKeyToAccount(
  "0x8393e9c90d605f0274dd460f3a82fa00c7ff107e6ef0731c6cd11ff9ece83d83",
);

export const client = createWalletClient({
  account,
  chain: polygon,
  transport: http(),
});
