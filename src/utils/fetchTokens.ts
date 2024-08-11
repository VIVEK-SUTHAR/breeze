import { TokenApiResponse } from "@/types";
import axios from "axios";

const API_KEY = "72a5b4b0-e727-48be-8aa1-5da9d62fe635";
const API_BASE_URL = "https://api.socket.tech/v2/token-lists/chain";

async function fetchTokensForChain(chainId: string) {
  try {
    const response = await axios.get<TokenApiResponse>(
      `${API_BASE_URL}?chainId=${chainId}`,
      {
        headers: {
          Accept: "application/json",
          "API-KEY": API_KEY,
        },
      }
    );

    if (response.data.success) {
      return response.data.result;
    } else {
      console.error(`Failed to fetch tokens for chain ${chainId}`);
      return [];
    }
  } catch (error) {
    console.error(
      `Error fetching tokens for chain ${chainId}:`,
      (error as Error).message
    );
    return [];
  }
}

export default fetchTokensForChain;
