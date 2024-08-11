import createRequest from ".";
import {
  BREEZEGATEWAYADDRESSPOLYGON,
  SOCKET_API_KEY,
  SocketAPIURL,
} from "../constants";
import {
  CrossChainRoute,
  SameChainRoute,
  SocketResponse,
  SocketTx,
  SwapRoutes,
} from "../types/Socket";
import axios, { AxiosResponse } from "axios";

export class SocketApi {
  static async getRoutes(
    fromChainId: string,
    toChainId: string,
    fromTokenAddress: string,
    toTokenAddress: string,
    fromAmount: string,
    recipient: string
  ): Promise<SwapRoutes | undefined> {
    try {
      const params = {
        fromChainId,
        toChainId,
        fromTokenAddress,
        toTokenAddress,
        fromAmount,
        userAddress: BREEZEGATEWAYADDRESSPOLYGON,
        singleTxOnly: "true",
        uniqueRoutesPerBridge: "false",
        sort: "output",
        recipient,
        isContractCall: "true",
      };

      const queryString = new URLSearchParams(params).toString();
      console.log("query string", queryString);

      const data: AxiosResponse<SocketResponse> = await axios.get(
        `${SocketAPIURL}/quote?${queryString}`,
        {
          headers: {
            Accept: "application/json",
            "API-KEY": SOCKET_API_KEY,
          },
        }
      );
      console.log("this is data", data.data.result);

      return data.data.result as SwapRoutes;
    } catch (error) {
      console.log("error", error);
    }
  }

  static async buildTxn(
    route: CrossChainRoute | SameChainRoute
  ): Promise<SocketTx | undefined> {
    try {
      console.log("this is sent route", route);
      const data: AxiosResponse<SocketResponse> = await axios.post(
        `${SocketAPIURL}/build-tx`,
        {
          route: route,
        },
        {
          headers: {
            Accept: "application/json",
            "API-KEY": SOCKET_API_KEY,
          },
        }
      );

      return data.data.result as SocketTx;
    } catch (error) {
      console.log("error", error);
    }
  }
}

const fetchTxnData = async (
  fromChainId: string,
  toChainId: string,
  fromTokenAddress: string,
  toTokenAddress: string,
  fromAmount: string,
  recipient: string
) => {
  const routes = await SocketApi.getRoutes(
    fromChainId,
    toChainId,
    fromTokenAddress === "0x0000000000000000000000000000000000000000"
      ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      : fromTokenAddress,
    toTokenAddress,
    fromAmount,
    recipient
  );
  console.log("routes", routes);

  if (routes) {
    const route = routes.routes[0];
    const txnData = await SocketApi.buildTxn(route);
    return txnData;
  }
};

export default fetchTxnData;
