"use client";

import React, { useState, useEffect } from "react";
import chainData from "../../utils/Chains";
import CustomDropdown from "../ui/CustomDropdown"; // Import CustomDropdown

interface Chain {
  chainId: number;
  name: string;
  icon: string;
}

function DCAOrder() {
  const [chains, setChains] = useState<Chain[]>([]);
  const [buyChain, setBuyChain] = useState<string>("");
  const [sellChain, setSellChain] = useState<string>("");
  const [buyToken, setBuyToken] = useState<string>("ETH");
  const [sellToken, setSellToken] = useState<string>("USDC");
  const [amount, setAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("daily");
  const [duration, setDuration] = useState<string>("");

  const tokens = ["ETH", "USDC", "USDC.E", "MATIC"];

  useEffect(() => {
    setChains(chainData);
    if (chainData.length > 0) {
      setBuyChain(chainData[0].name);
      setSellChain(chainData[0].name);
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg border bg-white text-gray-900 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">DCA</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          Chain to buy on
        </label>
        <CustomDropdown
          selectedChain={buyChain}
          chains={chains}
          onSelect={setBuyChain}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          Token to buy
        </label>
        <CustomDropdown
          selectedChain={buyToken}
          chains={tokens.map((token) => ({ name: token, chainId: 0, icon: "" }))} // Mock chain data for tokens
          onSelect={setBuyToken}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          Chain to sell on
        </label>
        <CustomDropdown
          selectedChain={sellChain}
          chains={chains}
          onSelect={setSellChain}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          Token to sell
        </label>
        <CustomDropdown
          selectedChain={sellToken}
          chains={tokens.map((token) => ({ name: token, chainId: 0, icon: "" }))} // Mock chain data for tokens
          onSelect={setSellToken}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          Amount per purchase
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
          Frequency
        </label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          Duration (in days)
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="30"
          className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>

      <button
        className="mt-4 w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200"
      >
        Start DCA
      </button>
    </div>
  );
}

export default DCAOrder;
