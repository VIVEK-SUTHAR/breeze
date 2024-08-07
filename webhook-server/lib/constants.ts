export const SocketAPIURL = "https://api.socket.tech/v2";
export const SOCKET_API_KEY = "72a5b4b0-e727-48be-8aa1-5da9d62fe635";
export const BREEZEGATEWAYADDRESS =
  "0xFC4732285f09603BEaf8492420376170Abdf4Fff";
export const abi = [
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
        internalType: "string",
        name: "targetPrice",
        type: "string",
      },
    ],
    name: "BridgeInitiated",
    type: "event",
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
    name: "initiateBridging",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "withdrawERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawNative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "admin",
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
    ],
    stateMutability: "view",
    type: "function",
  },
];
