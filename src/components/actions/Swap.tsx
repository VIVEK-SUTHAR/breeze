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

function Swap() {
  const [chains, setChains] = useState<Chain[]>([]);
  const [fromChain, setFromChain] = useState<string>("");
  const [toChain, setToChain] = useState<string>("");
  const [fromToken, setFromToken] = useState<string>("USDC");
  const [toToken, setToToken] = useState<string>("USDC.E");
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");

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
    setFromValue(toValue);
    setToValue(tempValue);
    setFromChain(toChain);
    setToChain(tempChain);
    setFromToken(toToken);
    setToToken(tempToken);
  };

  return (
    <div className="max-w-max mx-auto mt-10 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Swap</h2>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-white">From</label>
          <span className="text-sm text-white">
            Bal: 0 <button className="text-purple-500">MAX</button>
          </span>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <CustomDropdown
            selectedChain={fromChain}
            chains={chains}
            onSelect={setFromChain}
          />
          <input
            type="text"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className=" bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
            placeholder="0.0"
          />
          <select
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
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
          className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors duration-200"
        >
          <Arrow className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-white">To</label>
          <span className="text-sm text-white">Bal: 0</span>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <CustomDropdown
            selectedChain={toChain}
            chains={chains}
            onSelect={setToChain}
          />
          <input
            type="text"
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
            className="flex-grow bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
            placeholder="0.0"
          />
          <select
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
          >
            {tokens.map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="mt-4 w-full px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Swap
      </button>
    </div>
  );
}

export default Swap;
