import { RSI, MACD, SMA } from 'technicalindicators';

export function calculateRSI(prices: number[], period: number = 14) {
  return RSI.calculate({
    values: prices,
    period
  });
}

export function calculateMACD(prices: number[]) {
  return MACD.calculate({
    values: prices,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
  });
}

export function calculateMovingAverages(prices: number[]) {
  const sma20 = SMA.calculate({ period: 20, values: prices });
  const sma50 = SMA.calculate({ period: 50, values: prices });
  const sma200 = SMA.calculate({ period: 200, values: prices });

  return {
    sma20: sma20[sma20.length - 1],
    sma50: sma50[sma50.length - 1],
    sma200: sma200[sma200.length - 1],
  };
}

export function generateSignals(technicalData: any) {
  const signals = [];
  const { rsi, macd, movingAverages } = technicalData;

  // RSI Signals
  if (rsi < 30) signals.push({ type: 'BUY', indicator: 'RSI', strength: 'Strong' });
  else if (rsi > 70) signals.push({ type: 'SELL', indicator: 'RSI', strength: 'Strong' });

  // MACD Signals
  if (macd.histogram > 0 && macd.histogram > macd.signal) 
    signals.push({ type: 'BUY', indicator: 'MACD', strength: 'Medium' });
  else if (macd.histogram < 0 && macd.histogram < macd.signal)
    signals.push({ type: 'SELL', indicator: 'MACD', strength: 'Medium' });

  // Moving Average Signals
  if (movingAverages.sma20 > movingAverages.sma50)
    signals.push({ type: 'BUY', indicator: 'MA Cross', strength: 'Medium' });
  else if (movingAverages.sma20 < movingAverages.sma50)
    signals.push({ type: 'SELL', indicator: 'MA Cross', strength: 'Medium' });

  return signals;
}