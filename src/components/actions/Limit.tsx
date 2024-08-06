"use client";

import React, { useState } from "react";
import Arrow from "../ui/Arrow";

function LimitOrder() {
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");

  const handleSwap = () => {
    // Swap the token values
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">
          You're selling
        </label>
        <input
          type="text"
          value={fromToken}
          onChange={(e) => setFromToken(e.target.value)}
          placeholder="Token"
          className="mt-3 block w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
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
        <label className="block text-sm font-medium text-white">
          To receive
        </label>
        <input
          type="text"
          value={toToken}
          onChange={(e) => setToToken(e.target.value)}
          placeholder="Token"
          className="mt-3 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">
          Amount to sell
        </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="mt-3 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">
          Limit price
        </label>
        <input
          type="text"
          value={limitPrice}
          onChange={(e) => setLimitPrice(e.target.value)}
          placeholder="0.0"
          className="mt-3 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
      </div>
      <button
        className="mt-4 w-full px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Place Limit Order
      </button>
    </div>
  );
}

export default LimitOrder;