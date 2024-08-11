import { createWalletClient, custom, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet, optimism, polygonAmoy, polygon } from "viem/chains";

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

export const client = createWalletClient({
  account,
  chain: polygon,
  transport: http(),
});
