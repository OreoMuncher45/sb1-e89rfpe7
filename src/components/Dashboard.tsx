import React from 'react';
import { LineChart, BarChart, Activity, TrendingUp, AlertTriangle, Settings } from 'lucide-react';
import TradingView from './TradingView';
import StrategyPanel from './StrategyPanel';
import SignalsList from './SignalsList';
import PerformanceMetrics from './PerformanceMetrics';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">TradeSage</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-green-500" />
              <h3 className="font-semibold">Portfolio Value</h3>
            </div>
            <p className="text-2xl font-bold">$124,567.89</p>
            <p className="text-green-500">+2.34% (24h)</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart className="text-blue-500" />
              <h3 className="font-semibold">Active Trades</h3>
            </div>
            <p className="text-2xl font-bold">7</p>
            <p className="text-gray-400">4 Long • 3 Short</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="text-yellow-500" />
              <h3 className="font-semibold">Risk Level</h3>
            </div>
            <p className="text-2xl font-bold">Medium</p>
            <p className="text-gray-400">Based on market volatility</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TradingView />
          </div>
          <div>
            <StrategyPanel />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <SignalsList />
          <PerformanceMetrics />
        </div>
      </main>
    </div>
  );
}