import createRequest from ".";
import {
  BREEZEGATEWAYADDRESS,
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

export class SocketApi {
  static async getRoutes(
    fromChainId: string,
    toChainId: string,
    fromTokenAddress: string,
    toTokenAddress: string,
    fromAmount: string
  ): Promise<SwapRoutes> {
    const data: SocketResponse = await createRequest(
      `/quote`,
      "POST",
      {
        fromChainId,
        toChainId,
        fromTokenAddress,
        toTokenAddress,
        fromAmount,
        userAddress: BREEZEGATEWAYADDRESS,
        singleTxOnly: true,
        uniqueRoutesPerBridge: false,
        sort: "output",
      },
      SOCKET_API_KEY,
      SocketAPIURL
    );

    return data.result as SwapRoutes;
  }

  static async buildTxn(
    route: CrossChainRoute | SameChainRoute
  ): Promise<SocketTx> {
    console.log("this is sent route", route);

    const data: SocketResponse = await createRequest(
      `/build-tx`,
      "POST",
      {
        route: route,
      },
      SOCKET_API_KEY,
      SocketAPIURL
    );

    return data.result as SocketTx;
  }
}

const fetchTxnData = async (
  fromChainId: string,
  toChainId: string,
  fromTokenAddress: string,
  toTokenAddress: string,
  fromAmount: string
) => {
  const routes = await SocketApi.getRoutes(
    fromChainId,
    toChainId,
    fromTokenAddress,
    toTokenAddress,
    fromAmount
  );

  const route = routes.routes[0];
  const txnData = await SocketApi.buildTxn(route);
  return txnData;
};

export default fetchTxnData;
