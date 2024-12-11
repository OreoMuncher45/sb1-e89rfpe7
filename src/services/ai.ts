import { GoogleGenerativeAI } from '@google/generative-ai';
import { initializeAI } from './services/ai';
initializeAI('AIzaSyByZLHmWxNYXPTBmK8cZEn-fuLGy-bjpy8');

let genAI: GoogleGenerativeAI;

export function initializeAI(apiKey: string) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export async function getMarketAnalysis(
  symbol: string,
  price: number,
  change24h: number,
  technicalData: any
) {
  if (!genAI) throw new Error('AI not initialized');

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Analyze the following cryptocurrency market data for ${symbol}:
    Current Price: $${price}
    24h Change: ${change24h}%
    Technical Indicators:
    - RSI: ${technicalData.rsi}
    - MACD: ${technicalData.macd}
    - Moving Averages: ${technicalData.movingAverages}
    
    Provide a concise market analysis including:
    1. Current market sentiment
    2. Key support and resistance levels
    3. Trading recommendation
    4. Risk assessment`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function chatWithAI(message: string, context: any) {
  if (!genAI) throw new Error('AI not initialized');

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const chat = model.startChat({
    history: context.history || [],
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}