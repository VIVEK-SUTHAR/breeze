import { createWalletClient, custom, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet, optimism, polygonAmoy, polygon } from "viem/chains";

const account = privateKeyToAccount(
  "0xuseyourownprivatekey"
);

export const client = createWalletClient({
  account,
  chain: polygon,
  transport: http(),
});
