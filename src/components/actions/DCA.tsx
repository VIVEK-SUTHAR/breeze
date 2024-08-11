"use client";

import React, { useState, useEffect } from "react";
import chainData from "../../utils/Chains";
import CustomDropdown from "../ui/CustomDropdown"; // Import CustomDropdown
import { TokenData } from "@/types";
import fetchTokensForChain from "@/utils/fetchTokens";
import { parseUnits } from "viem";
import { abi } from "@/constants";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import getContractAddressFromSelectedChain from "@/utils/getAddressFromSelectedChain";

interface Chain {
  chainId: number;
  name: string;
  icon: string;
}

function DCAOrder() {
  const [chains, setChains] = useState<Chain[]>([]);
  const [fromChain, setFromChain] = useState<Chain>();
  const [toChain, setToChain] = useState<Chain>();
  const [fromTokens, setFromTokens] = useState<TokenData[]>([]);
  const [toTokens, setToTokens] = useState<TokenData[]>([]);
  const [fromToken, setFromToken] = useState<TokenData>();
  const [toToken, setToToken] = useState<TokenData>();
  const [amount, setAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("min");
  const [duration, setDuration] = useState<string>("");
  const [orderQuantity, setOrderQauntity] = useState<string>("");
  const { address, chainId } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const { switchChain } = useSwitchChain();

  const placeDCAOrder = () => {
    if (!fromChain || !toChain || !fromToken || !toToken) return;
    console.log(
      "got this data",
      address,
      fromToken.address,
      toToken.address,
      fromChain.chainId,
      toChain.chainId,
      parseUnits(amount, fromToken.decimals),
      BigInt(orderQuantity),
      duration + " " + frequency
    );
    if (chainId !== fromChain.chainId) {
      console.log("chain is different");
      switchChain({ chainId: fromChain.chainId });
    }

    writeContract({
      address: getContractAddressFromSelectedChain(fromChain.chainId),
      abi,
      functionName: "initiateDCAOrder",
      args: [
        address,
        fromToken.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          ? "0x0000000000000000000000000000000000000000"
          : fromToken.address,
        toToken.address,
        fromChain.chainId,
        toChain.chainId,
        parseUnits(amount, fromToken.decimals),
        BigInt(orderQuantity),
        duration + " " + frequency,
      ],
      value:
        fromToken.address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          ? parseUnits(amount, fromToken.decimals)
          : BigInt(0),
    });
  };

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
  }, [fromToken, fromTokens]);

  useEffect(() => {
    console.log("got to tokens", toTokens);
    if (!toTokens) return;
    if (toTokens.length > 0 && !toToken) {
      console.log("got to tokens", toTokens);

      setToToken(toTokens[0]);
    }
  }, [toToken, toTokens]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg border bg-white text-gray-900 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">DCA</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          You `&apos;` re selling
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
          Amount
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
          No. of Orders
        </label>
        <input
          type="text"
          value={orderQuantity}
          onChange={(e) => setOrderQauntity(e.target.value)}
          placeholder="0.0"
          className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>

      <div className="mb-4 ">
        <label className="block text-sm font-medium text-gray-900">
          Frequency
        </label>
        <div className="flex flex-row gap-4">
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="30"
            className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />

          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          >
            <option value="min">Minute</option>
            <option value="hours">Hour</option>
            <option value="days">Day</option>
          </select>
        </div>
      </div>

      <button
        className="mt-4 w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200"
        onClick={placeDCAOrder}
      >
        Start DCA
      </button>
    </div>
  );
}

export default DCAOrder;
