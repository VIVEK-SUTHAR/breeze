"use client";

import React, { useState } from "react";

function DCAOrder() {
  const [buyToken, setBuyToken] = useState("");
  const [sellToken, setSellToken] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [duration, setDuration] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">
          Token to buy
        </label>
        <input
          type="text"
          value={buyToken}
          onChange={(e) => setBuyToken(e.target.value)}
          placeholder="Token"
          className="mt-3 block w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white">
          Token to sell
        </label>
        <input
          type="text"
          value={sellToken}
          onChange={(e) => setSellToken(e.target.value)}
          placeholder="Token"
          className="mt-3 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white">
          Amount per purchase
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
          Frequency
        </label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="mt-3 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-gray-700 text-white"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white">
          Duration (in days)
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="30"
          className="mt-3 block w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
      </div>

      <button
        className="mt-4 w-full px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Start DCA
      </button>
    </div>
  );
}

export default DCAOrder;