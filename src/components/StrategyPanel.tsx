import React from 'react';
import { TradingStrategy } from '../types';
import { Play, Pause, Edit } from 'lucide-react';

const strategies: TradingStrategy[] = [
  {
    id: '1',
    name: 'RSI Reversal',
    description: 'Trades RSI oversold/overbought conditions',
    active: true,
    indicators: ['RSI', 'MA'],
    riskLevel: 'Medium'
  },
  {
    id: '2',
    name: 'MACD Crossover',
    description: 'Trades MACD signal line crossovers',
    active: false,
    indicators: ['MACD'],
    riskLevel: 'High'
  }
];

export default function StrategyPanel() {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Active Strategies</h2>
      <div className="space-y-4">
        {strategies.map((strategy) => (
          <div key={strategy.id} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{strategy.name}</h3>
              <button className="p-1 hover:bg-gray-600 rounded">
                {strategy.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-2">{strategy.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className={`px-2 py-1 rounded ${
                strategy.riskLevel === 'Low' ? 'bg-green-900 text-green-300' :
                strategy.riskLevel === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {strategy.riskLevel} Risk
              </span>
              <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}