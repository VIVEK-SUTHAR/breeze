import {
  BREEZEGATEWAYADDRESSBASE,
  BREEZEGATEWAYADDRESSMODE,
  BREEZEGATEWAYADDRESSOPTIMISM,
  BREEZEGATEWAYADDRESSPOLYGON,
} from "../constants";

export default function getContractAddressFromSelectedChain(
  chainId: number | undefined
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
