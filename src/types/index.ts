export interface TokenData {
  name: string;
  address: string;
  icon: string;
  decimals: number;
  symbol: string;
  chainId: number;
  logoURI: string;
  chainAgnosticId: string;
}

export interface TokenApiResponse {
  success: boolean;
  result: TokenData[];
}
