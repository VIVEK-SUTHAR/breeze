"use client";

import React, { useState, useEffect } from "react";
import Arrow from "../ui/Arrow";
import chainData from "../../utils/Chains";
import CustomDropdown from "../ui/CustomDropdown";
import { TokenData } from "@/types";
import fetchTokensForChain from "@/utils/fetchTokens";

interface Chain {
  chainId: number;
  name: string;
  icon: string;
}

function Swap() {
  const [chains, setChains] = useState<Chain[]>([]);
  const [fromChain, setFromChain] = useState<Chain>();
  const [toChain, setToChain] = useState<Chain>();
  const [fromTokens, setFromTokens] = useState<TokenData[]>([]);
  const [toTokens, setToTokens] = useState<TokenData[]>([]);
  const [fromToken, setFromToken] = useState<TokenData>();
  const [toToken, setToToken] = useState<TokenData>();

  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");

  const tokens = ["ETH", "USDC", "USDC.E", "MATIC"];

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
    setFromValue(toValue);
    setToValue(tempValue);
    setFromChain(toChain);
    setToChain(tempChain);
    setFromToken(toToken);
    setToToken(tempToken);
  };

  return (
    <div className="max-w-max mx-auto mt-10 p-6 rounded-lg border bg-white text-black shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Bridge</h2>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-900">
            From
          </label>
          <span className="text-sm text-gray-600">
            Bal: 0 <button className="text-orange-500">MAX</button>
          </span>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          {fromChain && (
            <CustomDropdown
              selectedChain={fromChain}
              items={chains}
              onSelect={setFromChain}
            />
          )}

          <input
            type="text"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="block px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="0.0"
          />
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
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-900">To</label>
          <span className="text-sm text-gray-600">Bal: 0</span>
        </div>
        <div className="flex items-center justify-between space-x-2 mb-2">
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

      <button className="mt-4 w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200">
        Trade
      </button>
    </div>
  );
}

export default Swap;
