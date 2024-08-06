export type SocketResponse = {
  success: boolean;
  result: SwapRoutes | SocketTx;
};

export interface SwapRoutes {
  routes: SameChainRoute[] | CrossChainRoute[];
  fromChainId: number;
  fromAsset: SocketTokenData;
  toChainId: number;
  toAsset: SocketTokenData;
}

export type SocketTx = {
  userTxType: string;
  txTarget: string;
  chainId: string;
  txData: string;
  txType: string;
  value: string;
  totalUserTx: number;
  approvalData: {
    minimumApprovalAmount: string;
    approvalTokenAddress: string;
    allowanceTarget: string;
    owner: string;
  };
};

interface CrossChainUserTx {
  userTxType: string;
  txType: string;
  chainId: number;
  toAmount: string;
  toAsset: SocketTokenData;
  stepCount: number;
  routePath: string;
  sender: string;
  approvalData: {
    minimumApprovalAmount: string;
    approvalTokenAddress: string;
    allowanceTarget: string;
    owner: string;
  };
  steps: Step[];
  gasFees: GasFees;
}

type SocketTokenData = {
  name: string;
  address: string;
  icon: string;
  decimals: number;
  symbol: string;
  chainId: string;
  logoURI: string;
  chainAgnosticId: string;
};

interface GasFees {
  gasAmount: string;
  gasLimit: number;
  asset: SocketTokenData;
  feesInUsd: number;
}

interface Protocol {
  name: string;
  displayName: string;
  icon: string;
}

interface Step {
  type: string;
  protocol: Protocol;
  chainId: number;
  fromAsset: SocketTokenData;
  fromAmount: string;
  toAsset: SocketTokenData;
  toAmount: string;
  swapSlippage: number;
  minAmountOut: string;
  gasFees: GasFees;
}

interface SameChainUserTx {
  userTxType: string;
  txType: string;
  swapSlippage: number;
  chainId: number;
  protocol: {
    name: string;
    displayName: string;
    icon: string;
  };
  fromAsset: SocketTokenData;
  approvalData: null | {
    minimumApprovalAmount: string;
    approvalTokenAddress: string;
    allowanceTarget: string;
    owner: string;
  };
  fromAmount: string;
  toAsset: SocketTokenData;
  toAmount: string;
  minAmountOut: string;
  gasFees: GasFees;
  sender: string;
  recipient: string;
  userTxIndex: number;
}

interface IntegratorFee {
  amount: string;
  asset: SocketTokenData;
}

export interface CrossChainRoute {
  routeId: string;
  isOnlySwapRoute: boolean;
  fromAmount: string;
  toAmount: string;
  usedBridgeNames: string[];
  minimumGasBalances: Record<string, string>;
  chainGasBalances: Record<
    string,
    { minGasBalance: string; hasGasBalance: boolean }
  >;
  totalUserTx: number;
  sender: string;
  recipient: string;
  totalGasFeesInUsd: number;
  receivedValueInUsd: number;
  inputValueInUsd: number;
  outputValueInUsd: number;
  userTxs: CrossChainUserTx[];
  serviceTime: number;
  maxServiceTime: number;
  integratorFee: IntegratorFee;
  extraData: Record<string, any>;
}

export interface SameChainRoute {
  routeId: string;
  isOnlySwapRoute: boolean;
  fromAmount: string;
  toAmount: string;
  sender: string;
  recipient: string;
  totalUserTx: number;
  totalGasFeesInUsd: number;
  userTxs: SameChainUserTx[];
  usedDexName: string;
  integratorFee: IntegratorFee;
  outputValueInUsd: number;
  receivedValueInUsd: number;
  inputValueInUsd: number;
}
