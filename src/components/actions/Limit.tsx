"use client";

import React, { useState, useEffect } from "react";
import Arrow from "../ui/Arrow";
import chainData from "../../utils/Chains";
import CustomDropdown from "../ui/CustomDropdown";
import fetchTokensForChain from "@/utils/fetchTokens";
import { TokenData } from "@/types";
import { useAccount, useWriteContract } from "wagmi";
import { abi, BREEZEGATEWAYADDRESS } from "@/constants";
import OrderHistory from "../ui/OrderHistory";
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
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [limitPrice, setLimitPrice] = useState<string>("");
  const [orderHistory, setOrderHistory] = useState<LimitOrder[]>([]);

  const { data: hash, writeContract } = useWriteContract();
  const { address } = useAccount();

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
  }, [fromTokens]);

  useEffect(() => {
    console.log("got to tokens", toTokens);
    if (!toTokens) return;
    if (toTokens.length > 0 && !toToken) {
      console.log("got to tokens", toTokens);

      setToToken(toTokens[0]);
    }
  }, [toTokens]);

  const handleSwap = () => {
    const tempValue = fromValue;
    const tempChain = fromChain;
    const tempToken = fromToken;
    setFromChain(toChain);
    setToChain(tempChain);
    setFromToken(toToken);
    setToToken(tempToken);
    setFromValue(toValue);
    setToValue(tempValue);
  };

  const handlePlaceLimitOrder = () => {
    const newOrder: LimitOrder = {
      id: Date.now().toString(), // Simple unique ID
      fromChain,
      toChain,
      fromToken,
      toToken,
      amount,
      limitPrice,
      status: "active",
      timestamp: Date.now(),
    };
    setOrderHistory((prevHistory) => [newOrder, ...prevHistory]);
    // Reset form fields
    setAmount("");
    setLimitPrice("");
  };

  const handleCancelOrder = (orderId: string) => {
    setOrderHistory(prevHistory =>
      prevHistory.map(order =>
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      )
    );
  };

  const placeLimitOrder = () => {
    if (!fromChain || !toChain || !fromToken || !toToken) return;
    writeContract({
      address: BREEZEGATEWAYADDRESS,
      abi,
      functionName: "initiateLimitOrder",
      args: [
        address,
        fromToken.address,
        toToken.address,
        fromChain.chainId,
        toChain.chainId,
        parseFloat(fromValue),
        limitPrice,
      ],
    });
  };

  return (
    <div className="max-w-max mx-auto mt-10 p-6 rounded-lg border bg-white text-gray-900 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Limit Order</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          You're selling
        </label>
        <div className="flex items-center space-x-2 mt-3">
          {fromChain && (
            <CustomDropdown
              selectedChain={fromChain}
              items={chains}
              onSelect={setFromChain}
            />
          )}
          {/* <input
            type="text"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="0.0"
          /> */}
          {fromToken && (
            // <select
            //   value={fromToken?.name}
            //   className="border border-gray-300 rounded-md p-2 text-gray-900"
            // >
            //   {fromTokens.map((token) => (
            //     <option key={token.address} onClick={() => setFromToken(token)}>
            //       {token.name}
            //     </option>
            //   ))}
            // </select>
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
          {/* <input
            type="text"
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="0.0"
          /> */}
          {toToken && (
            // <select
            //   value={toToken?.name}
            //   className="border border-gray-300 rounded-md p-2 text-gray-900"
            // >
            //   {toTokens.map((token) => (
            //     <option key={token.address} onClick={() => setToToken(token)}>
            //       {token.name}
            //     </option>
            //   ))}
            // </select>
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
        onClick={handlePlaceLimitOrder}
        className="mt-4 w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200"
       onClick={placeLimitOrder}>
        Place Limit Order
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}

      <OrderHistory orders={orderHistory} onCancelOrder={handleCancelOrder} />
    </div>
  );
}

export default LimitOrder;
