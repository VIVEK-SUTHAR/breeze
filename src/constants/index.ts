export const APP_NAME = "Breeze";
export const APP_TITLE = "Seamless Cross-Chain Bridging";
export const APP_DESCRIPTION =
  "Seamlessly bridge assets across multiple blockchain networks with advanced features for optimized DeFi interactions.";
export const LANDING_CTA_TEXT = "Start Bridging Now";

export const BREEZEGATEWAYADDRESSPOLYGON =
  "0x118c9E7D758Cd3E527d7bA4B6Fc6f2eAA86b465f";

export const abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
    ],
    name: "cancelPendingOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "txData",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_allowanceTarget",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
    ],
    name: "contractCallERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "txData",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
    ],
    name: "contractCallNativeToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sourceToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "destToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sourceChain",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "destChain",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfOrders",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "interval",
        type: "string",
      },
    ],
    name: "DCAOrderInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ERC20Rescued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EtherRescued",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sourceToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_destToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_sourceChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_destChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numberOfOrders",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_interval",
        type: "string",
      },
    ],
    name: "initiateDCAOrder",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sourceToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_destToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_sourceChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_destChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "targetPrice",
        type: "string",
      },
    ],
    name: "initiateLimitOrder",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sourceToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "destToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sourceChain",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "destChain",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "targetPrice",
        type: "string",
      },
    ],
    name: "LimitOrderInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "transferId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sourceToken",
        type: "address",
      },
    ],
    name: "OrderCancelled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "rescueErc20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rescueEther",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserPendingTransfers",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "pendingTransfers",
    outputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sourceToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "destToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "sourceChain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "destChain",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "executed",
        type: "bool",
      },
      {
        internalType: "string",
        name: "targetPrice",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "numberOfOrders",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "interval",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isDCA",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userPendingTransfers",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
