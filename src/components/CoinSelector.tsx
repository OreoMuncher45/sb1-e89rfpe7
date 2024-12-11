import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSymbols } from '../hooks/useMarketData';

interface CoinSelectorProps {
  value: string;
  onChange: (symbol: string) => void;
}

export default function CoinSelector({ value, onChange }: CoinSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { data: symbols = [] } = useSymbols();

  const filteredSymbols = symbols.filter((s: any) =>
    s.baseAsset.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-700 px-3 py-1.5 rounded flex items-center space-x-2 hover:bg-gray-600"
      >
        <span>{value}</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search coins..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-700 pl-8 pr-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredSymbols.map((symbol: any) => (
              <button
                key={symbol.symbol}
                onClick={() => {
                  onChange(symbol.symbol);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-2"
              >
                <span>{symbol.baseAsset}/USDT</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}