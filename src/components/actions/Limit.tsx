"use client";

import React, { useState, useEffect } from "react";
import Arrow from "../ui/Arrow";
import chainData from "../../utils/Chains";
import CustomDropdown from "../ui/CustomDropdown";

interface Chain {
  chainId: number;
  name: string;
  icon: string;
}

function LimitOrder() {
  const [chains, setChains] = useState<Chain[]>([]);
  const [fromChain, setFromChain] = useState<string>("");
  const [toChain, setToChain] = useState<string>("");
  const [fromToken, setFromToken] = useState<string>("USDC");
  const [toToken, setToToken] = useState<string>("USDC.E");
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");

  const [amount, setAmount] = useState<string>("");
  const [limitPrice, setLimitPrice] = useState<string>("");

  const tokens = ["ETH", "USDC", "USDC.E", "MATIC"];

  useEffect(() => {
    setChains(chainData);
    if (chainData.length > 0) {
      setFromChain(chainData[0].name);
      setToChain(chainData[1].name);
    }
  }, []);

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

  return (
    <div className="max-w-max mx-auto mt-10 p-6 rounded-lg border bg-white text-gray-900 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Limit Order</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          You're selling
        </label>
        <div className="flex items-center space-x-2 mt-3">
          <CustomDropdown
            selectedChain={fromChain}
            chains={chains}
            onSelect={setFromChain}
          />
          <input
            type="text"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="0.0"
          />
          <select
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-gray-900"
          >
            {tokens.map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
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
          <CustomDropdown
            selectedChain={toChain}
            chains={chains}
            onSelect={setToChain}
          />
          <input
            type="text"
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="0.0"
          />
          <select
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-gray-900"
          >
            {tokens.map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
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

      <button className="mt-4 w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200">
        Place Limit Order
      </button>
    </div>
  );
}

export default LimitOrder;
