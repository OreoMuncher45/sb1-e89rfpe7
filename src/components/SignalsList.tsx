import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { generateSignals } from '../services/technicalAnalysis';

export default function SignalsList() {
  const { data: signals = [] } = useQuery({
    queryKey: ['signals'],
    queryFn: () => generateSignals(technicalData),
    enabled: !!technicalData,
    refetchInterval: 60000, // Refresh every minute
  });

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Trading Signals</h2>
      <div className="space-y-3">
        {signals.map((signal, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {signal.type === 'BUY' ? (
                <ArrowUpCircle className="w-6 h-6 text-green-500" />
              ) : (
                <ArrowDownCircle className="w-6 h-6 text-red-500" />
              )}
              <div>
                <h3 className="font-medium flex items-center space-x-2">
                  <span>{signal.type}</span>
                  <span className={`text-sm px-2 py-0.5 rounded ${
                    signal.strength === 'Strong' ? 'bg-green-900 text-green-300' :
                    'bg-yellow-900 text-yellow-300'
                  }`}>
                    {signal.strength}
                  </span>
                </h3>
                <p className="text-sm text-gray-400">
                  Based on {signal.indicator}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {signal.type === 'BUY' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}