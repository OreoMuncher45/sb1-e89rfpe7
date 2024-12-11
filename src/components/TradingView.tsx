import React, { useState, useEffect } from 'react';
import { useTicker } from '../hooks/useMarketData';
import CoinSelector from './CoinSelector';
import PriceChart from './PriceChart';
import AIAnalysis from './AIAnalysis';
import { calculateRSI, calculateMACD, calculateMovingAverages } from '../services/technicalAnalysis';

export default function TradingView() {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [interval, setInterval] = useState('1h');
  const [technicalData, setTechnicalData] = useState(null);
  
  const { data: ticker } = useTicker(symbol);
  const { data: klines } = useKlines(symbol, interval);

  useEffect(() => {
    if (klines) {
      const prices = klines.map(k => k.close);
      const rsi = calculateRSI(prices);
      const macd = calculateMACD(prices);
      const movingAverages = calculateMovingAverages(prices);

      setTechnicalData({
        rsi: rsi[rsi.length - 1],
        macd: macd[macd.length - 1],
        movingAverages,
      });
    }
  }, [klines]);

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <CoinSelector value={symbol} onChange={setSymbol} />
            {ticker && (
              <div>
                <span className="text-lg font-semibold">
                  ${ticker.price.toLocaleString()}
                </span>
                <span className={`ml-2 ${
                  ticker.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {ticker.change24h > 0 ? '+' : ''}{ticker.change24h.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <select
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              className="bg-gray-700 rounded px-2 py-1"
            >
              <option value="1m">1m</option>
              <option value="5m">5m</option>
              <option value="15m">15m</option>
              <option value="1h">1h</option>
              <option value="4h">4h</option>
              <option value="1d">1d</option>
            </select>
          </div>
        </div>
        <PriceChart symbol={symbol} interval={interval} />
      </div>

      {ticker && technicalData && (
        <AIAnalysis
          symbol={symbol}
          price={ticker.price}
          change24h={ticker.change24h}
          technicalData={technicalData}
        />
      )}
    </div>
  );
}