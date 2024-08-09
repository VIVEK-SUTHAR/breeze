import React, { useState, useEffect, useRef } from "react";
import DownArrow from "./DownArrow";

interface Chain {
  chainId: number;
  name: string;
  icon: string;
}

interface CustomDropdownProps {
  selectedChain: string;
  chains: Chain[];
  onSelect: (chainName: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  selectedChain,
  chains,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (chainName: string) => {
    onSelect(chainName);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 rounded-md p-2 text-black flex items-center"
      >
        <img
          src={chains.find((chain) => chain.name === selectedChain)?.icon}
          alt={selectedChain}
          className="inline-block h-5 w-5 mr-2"
        />
        {selectedChain}
        <DownArrow className="ml-2 inline-block h-5 w-8" />
      </button>
      {isOpen && (
        <ul className="bg-gray-100 absolute z-10 mt-1 w-full border border-gray-300 rounded-md text-black">
          {chains.map((chain) => (
            <li
              key={chain.chainId}
              onClick={() => handleSelect(chain.name)}
              className="p-2 cursor-pointer hover:bg-gray-700 flex items-center"
            >
              <img
                src={chain.icon}
                alt={chain.name}
                className="inline-block h-5 w-5 mr-2"
              />
              {chain.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
