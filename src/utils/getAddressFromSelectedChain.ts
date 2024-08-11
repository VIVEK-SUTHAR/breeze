import {
  BREEZEGATEWAYADDRESSBASE,
  BREEZEGATEWAYADDRESSMODE,
  BREEZEGATEWAYADDRESSOPTIMISM,
  BREEZEGATEWAYADDRESSPOLYGON,
} from "@/constants";
export function shortenId(id: string, startChars = 6, endChars = 4) {
  if (id.length <= startChars + endChars) {
    return id; // Return as-is if it's already short enough
  }
  const start = id.substring(0, startChars);
  const end = id.substring(id.length - endChars);
  return `${start}...${end}`;
}
export default function getContractAddressFromSelectedChain(
  chainId: number | undefined,
) {
  switch (chainId) {
    case 137:
      return BREEZEGATEWAYADDRESSPOLYGON;
    case 10:
      return BREEZEGATEWAYADDRESSOPTIMISM;
    case 8453:
      return BREEZEGATEWAYADDRESSBASE;
    case 34443:
      return BREEZEGATEWAYADDRESSMODE;
    default:
      throw new Error("Unsupported Network");
  }
}

export function getChainNameFomId(chainId: number | undefined) {
  switch (chainId) {
    case 137:
      return "Polygon";
    case 10:
      return "Optimism";
    case 8453:
      return "Base";
    case 34443:
      return "Mode";
    default:
      throw new Error("Unsupported Network");
  }
}
