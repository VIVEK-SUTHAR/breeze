import { createWalletClient, custom, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet, optimism, polygonAmoy } from "viem/chains";

const account = privateKeyToAccount(
  "0xaddyourprivatekey"
);

export const client = createWalletClient({
  account,
  chain: polygonAmoy,
  transport: http(),
});
