import React from 'react';
import { LineChart, TrendingUp, Clock, Target } from 'lucide-react';

export default function PerformanceMetrics() {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-400">Win Rate</span>
          </div>
          <p className="text-xl font-bold">68.5%</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-400">Profit Factor</span>
          </div>
          <p className="text-xl font-bold">1.85</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-400">Avg Hold Time</span>
          </div>
          <p className="text-xl font-bold">2.4h</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <LineChart className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-400">Monthly Return</span>
          </div>
          <p className="text-xl font-bold">+12.4%</p>
        </div>
      </div>
    </div>
  );
}