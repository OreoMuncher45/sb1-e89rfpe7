import { useQuery } from '@tanstack/react-query';
import { getKlines, getTicker, getSymbols } from '../api/binance';

export function useKlines(symbol: string, interval: string) {
  return useQuery({
    queryKey: ['klines', symbol, interval],
    queryFn: () => getKlines(symbol, interval),
    refetchInterval: 10000,
  });
}

export function useTicker(symbol: string) {
  return useQuery({
    queryKey: ['ticker', symbol],
    queryFn: () => getTicker(symbol),
    refetchInterval: 5000,
  });
}

export function useSymbols() {
  return useQuery({
    queryKey: ['symbols'],
    queryFn: getSymbols,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}