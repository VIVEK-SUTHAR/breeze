"use client";

import React, { useState } from "react";
import Arrow from "../ui/Arrow";

function Swap() {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const handleSwap = () => {
    // Swap the values
    const temp = fromValue;
    setFromValue(toValue);
    setToValue(temp);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">
          You're paying
        </label>
        <input
          type="text"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
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
          value={toValue}
          onChange={(e) => setToValue(e.target.value)}
          className="mt-3 block w-full px-3 py-2 border border-gray-600  rounded-lg shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
      </div>

      <button
        onClick={handleSwap}
        className="mt-4 w-full px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Swap
      </button>
    </div>
  );
}

export default Swap;
