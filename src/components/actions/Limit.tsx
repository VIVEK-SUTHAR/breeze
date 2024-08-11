"use client";

import React, { useState, useEffect } from "react";
import Arrow from "../ui/Arrow";
import chainData from "../../utils/Chains";
import CustomDropdown from "../ui/CustomDropdown";
import fetchTokensForChain from "@/utils/fetchTokens";
import { TokenData } from "@/types";
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { abi } from "@/constants";
import OrderHistory from "../ui/OrderHistory";
import { parseUnits } from "viem";
import getContractAddressFromSelectedChain, {
  getChainNameFomId,
  shortenId,
} from "@/utils/getAddressFromSelectedChain";
import TransactionSuccessModal from "../ui/SuccessModal";
interface Chain {
  chainId: number;
  name: string;
  icon: string;
}

interface LimitOrder {
  id: string;
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;
  amount: string;
  limitPrice: string;
  status: "active" | "completed" | "cancelled";
  timestamp: number;
}

function LimitOrder() {
  const [chains, setChains] = useState<Chain[]>([]);
  const [fromChain, setFromChain] = useState<Chain>();
  const [toChain, setToChain] = useState<Chain>();
  const [fromTokens, setFromTokens] = useState<TokenData[]>([]);
  const [toTokens, setToTokens] = useState<TokenData[]>([]);
  const [fromToken, setFromToken] = useState<TokenData>();
  const [toToken, setToToken] = useState<TokenData>();

  const [amount, setAmount] = useState<string>("");
  const [limitPrice, setLimitPrice] = useState<string>("");
  const [orderHistory, setOrderHistory] = useState<LimitOrder[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const { data: hash, writeContract } = useWriteContract();
  const { address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    setChains(chainData);
    if (chainData.length > 0) {
      setFromChain(chainData[0]);
      setToChain(chainData[1]);
    }
  }, []);

  useEffect(() => {
    if (fromChain) {
      fetchTokensForChain(fromChain.chainId.toString()).then((tokens) => {
        console.log("got this tokens", tokens);
        setFromTokens(tokens);
      });
    }
  }, [fromChain]);

  useEffect(() => {
    if (toChain) {
      fetchTokensForChain(toChain.chainId.toString()).then((tokens) => {
        console.log("got this tokens", tokens);
        setToTokens(tokens);
      });
    }
  }, [toChain]);

  useEffect(() => {
    console.log("got from tokens", fromTokens);

    if (!fromTokens) return;
    if (fromTokens.length > 0 && !fromToken) {
      console.log("got from tokens", fromTokens);

      setFromToken(fromTokens[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromTokens]);

  useEffect(() => {
    console.log("got to tokens", toTokens);
    if (!toTokens) return;
    if (toTokens.length > 0 && !toToken) {
      console.log("got to tokens", toTokens);

      setToToken(toTokens[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toTokens]);

  useEffect(() => {}, [hash]);
  const handleSwap = () => {
    const tempChain = fromChain;
    const tempToken = fromToken;
    setFromChain(toChain);
    setToChain(tempChain);
    setFromToken(toToken);
    setToToken(tempToken);
  };

  // const handlePlaceLimitOrder = () => {
  //   const newOrder: LimitOrder = {
  //     id: Date.now().toString(), // Simple unique ID
  //     fromChain,
  //     toChain,
  //     fromToken,
  //     toToken,
  //     amount,
  //     limitPrice,
  //     status: "active",
  //     timestamp: Date.now(),
  //   };
  //   setOrderHistory((prevHistory) => [newOrder, ...prevHistory]);
  //   // Reset form fields
  //   setAmount("");
  //   setLimitPrice("");
  // };

  const handleCancelOrder = (orderId: string) => {
    setOrderHistory((prevHistory) =>
      prevHistory.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  const placeLimitOrder = async () => {
    if (!fromChain || !toChain || !fromToken || !toToken) return;
    if (chainId !== fromChain.chainId) {
      console.log("chain is different");
      switchChain({ chainId: fromChain.chainId });
    }
    console.log(
      "got this data",
      address,
      fromToken.address,
      toToken.address,
      fromChain.chainId,
      toChain.chainId,
      parseUnits(amount, fromToken.decimals),
      limitPrice
    );

    writeContract({
      address: getContractAddressFromSelectedChain(fromChain.chainId),
      abi,
      functionName: "initiateLimitOrder",
      args: [
        address,
        fromToken.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          ? "0x0000000000000000000000000000000000000000"
          : fromToken.address,
        toToken.address,
        fromChain.chainId,
        toChain.chainId,
        parseUnits(amount, fromToken.decimals),
        limitPrice,
      ],
      value:
        fromToken.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          ? parseUnits(amount, fromToken.decimals)
          : BigInt(0),
    });
  };

  return (
    <div className="max-w-max mx-auto mt-10 p-6 rounded-lg border bg-white text-gray-900 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Limit Order</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          You`&apos;`re selling
        </label>
        <div className="flex items-center space-x-2 mt-3">
          {fromChain && (
            <CustomDropdown
              selectedChain={fromChain}
              items={chains}
              onSelect={setFromChain}
            />
          )}

          {fromToken && (
            <CustomDropdown
              selectedChain={fromToken}
              items={fromTokens}
              onSelect={(chain) => {
                setFromToken(chain as TokenData);
              }}
            />
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSwap}
          className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
        >
          <Arrow className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          To receive
        </label>
        <div className="flex items-center space-x-2 mt-3">
          {toChain && (
            <CustomDropdown
              selectedChain={toChain}
              items={chains}
              onSelect={setToChain}
            />
          )}
          {toToken && (
            <CustomDropdown
              selectedChain={toToken}
              items={toTokens}
              onSelect={(chain) => {
                setToToken(chain as TokenData);
              }}
            />
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          Amount to sell
        </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          Limit price
        </label>
        <input
          type="text"
          value={limitPrice}
          onChange={(e) => setLimitPrice(e.target.value)}
          placeholder="0.0"
          className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>

      <button
        className="mt-4 w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200"
        onClick={placeLimitOrder}
      >
        Place Limit Order
      </button>
      {
        <TransactionSuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          hash={hash ?? ""}
          chainId={chainId || 137}
        />
      }
      <UserLimitOrders />
    </div>
  );
}
export default LimitOrder;
const UserLimitOrders = () => {
  const { address, chainId } = useAccount();
  const contractAddress = getContractAddressFromSelectedChain(chainId);

  const { data, error, isLoading } = useReadContract({
    address: contractAddress,
    chainId: chainId,
    abi: abi,
    args: [address],
    functionName: "getUserPendingTransfers",
  });

  const pendingTransfers = data as string[];
  const handleCancelOrder = async (transferId: string) => {};

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading orders: {error.message}</p>}
      {data && (data as string[]).length > 0 ? (
        (data as string[]).map((id: string) => (
          <SinglePendingOrder key={id} transferId={id} />
        ))
      ) : (
        <p>No pending orders found.</p>
      )}
    </div>
  );
};
const parsePendingTransfer = (data: any) => {
  if (!data) return null;

  const [
    user,
    amount,
    sourceToken,
    destToken,
    sourceChain,
    destChain,
    executed,
    targetPrice,
    numberOfOrders,
    interval,
    isDCA,
  ] = data;

  return {
    user: user,
    amount: amount.toString(), // Convert BigNumber to string for easier use
    sourceToken: sourceToken,
    destToken: destToken,
    sourceChain: parseInt(sourceChain, 10),
    destChain: parseInt(destChain, 10),
    executed: executed,
    targetPrice: targetPrice,
    numberOfOrders: parseInt(numberOfOrders, 10),
    interval: interval,
    isDCA: isDCA,
  };
};
interface PendingTransfer {
  user: string;
  amount: string;
  sourceToken: string;
  destToken: string;
  sourceChain: number;
  destChain: number;
  executed: boolean;
  targetPrice: string;
  numberOfOrders: number;
  interval: string;
  isDCA: boolean;
}

const SinglePendingOrder = ({ transferId }: { transferId: string }) => {
  const { chainId } = useAccount();
  const contractAddress = getContractAddressFromSelectedChain(chainId);

  const { data, error, isLoading } = useReadContract({
    address: contractAddress,
    chainId: chainId,
    abi: abi,
    args: [transferId],
    functionName: "pendingTransfers",
  });
  console.log("id", transferId);
  if (isLoading) return <p>Loading order details...</p>;
  if (error) return <p>Error loading order details: {error.message}</p>;
  const order = parsePendingTransfer(data as any) as PendingTransfer;
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-sm my-2">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-900">
          {getChainNameFomId(order.sourceChain)} →{" "}
          {getChainNameFomId(order.destChain)}
        </span>
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            order.executed === true
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {order.executed ? "Success " : "Pending "}
        </span>
      </div>

      <span className="font-medium text-gray-900">
        Transfer ID{shortenId(transferId)}
      </span>
      {/*
      }
   <p className="text-sm text-gray-600">
      //   Selling: {order.amount} {order.sourceToken}
      // </p>
      // <p className="text-sm text-gray-600">
      //   For: {order.destToken} at {order.targetPrice} {order.destToken}/
      //   {order.sourceToken}
      // </p>
      // {order.executed !== false && (
      //   <button
      //     className="mt-3 w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200"
      //   >
      //     Cancel Order
      //   </button>
      // )}
      */}
    </div>
  );
};
