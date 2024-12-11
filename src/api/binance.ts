import axios from 'axios';

const BASE_URL = 'https://api.binance.com/api/v3';

export async function getSymbols() {
  const { data } = await axios.get(`${BASE_URL}/exchangeInfo`);
  return data.symbols
    .filter((symbol: any) => symbol.quoteAsset === 'USDT' && symbol.status === 'TRADING')
    .map((symbol: any) => ({
      symbol: symbol.symbol,
      baseAsset: symbol.baseAsset,
      quoteAsset: symbol.quoteAsset,
    }));
}

export async function getKlines(symbol: string, interval: string, limit: number = 1000) {
  const { data } = await axios.get(`${BASE_URL}/klines`, {
    params: { symbol, interval, limit },
  });
  return data.map((kline: any[]) => ({
    time: kline[0] / 1000,
    open: parseFloat(kline[1]),
    high: parseFloat(kline[2]),
    low: parseFloat(kline[3]),
    close: parseFloat(kline[4]),
    volume: parseFloat(kline[5]),
  }));
}

export async function getTicker(symbol: string) {
  const { data } = await axios.get(`${BASE_URL}/ticker/24hr`, {
    params: { symbol },
  });
  return {
    symbol: data.symbol,
    price: parseFloat(data.lastPrice),
    change24h: parseFloat(data.priceChangePercent),
    volume: parseFloat(data.volume),
    high24h: parseFloat(data.highPrice),
    low24h: parseFloat(data.lowPrice),
  };
}