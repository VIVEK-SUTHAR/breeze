import React, { useState, useEffect, useRef } from "react";
import DownArrow from "./DownArrow";
import { TokenData } from "@/types";

interface Chain {
  chainId: number;
  name: string;
  icon: string;
}

interface CustomDropdownProps {
  selectedChain: Chain | TokenData;
  items: Chain[] | TokenData[];
  onSelect: (chain: Chain | TokenData) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  selectedChain,
  items,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (chain: Chain | TokenData) => {
    onSelect(chain);
    setIsOpen(false);
    setSearchTerm(""); // Clear search term after selection
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredItems = items.filter((chain) =>
    chain.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 rounded-md p-2 text-black flex items-center"
      >
        <img
          src={selectedChain.icon || (selectedChain as TokenData).logoURI}
          alt={selectedChain.name}
          className="inline-block h-5 w-5 mr-2"
        />
        {selectedChain.name}
        <DownArrow className="ml-2 inline-block h-5 w-8" />
      </button>
      {isOpen && (
        <div className="bg-gray-100 absolute z-10 mt-1 w-full border border-gray-300 rounded-md text-black max-h-60 overflow-y-auto overflow-x-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 border-b border-gray-300 text-sm focus:outline-none"
          />
          <ul className="max-h-48 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((chain) => (
                <li
                  key={chain.chainId}
                  onClick={() => handleSelect(chain)}
                  className="p-2 cursor-pointer hover:bg-orange-500 flex items-center"
                >
                  <img
                    src={chain.icon || (chain as TokenData).logoURI}
                    alt={chain.name}
                    className="inline-block h-5 w-5 mr-2"
                  />
                  {chain.name}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
