export interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
}

export interface TradingStrategy {
  id: string;
  name: string;
  description: string;
  active: boolean;
  indicators: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface TradeSignal {
  timestamp: number;
  symbol: string;
  type: 'BUY' | 'SELL';
  price: number;
  confidence: number;
  indicators: string[];
}