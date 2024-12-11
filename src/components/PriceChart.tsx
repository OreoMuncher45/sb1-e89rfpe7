import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useKlines } from '../hooks/useMarketData';

interface PriceChartProps {
  symbol: string;
  interval: string;
}

export default function PriceChart({ symbol, interval }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const { data: klines } = useKlines(symbol, interval);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#111827' },
        textColor: '#D1D5DB',
      },
      grid: {
        vertLines: { color: '#1F2937' },
        horzLines: { color: '#1F2937' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candlestickSeries = chartRef.current.addCandlestickSeries({
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#22C55E',
      wickDownColor: '#EF4444',
    });

    if (klines) {
      candlestickSeries.setData(klines);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [klines]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
}