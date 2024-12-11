import React, { useState } from 'react';
import { Brain, MessageSquare, Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getMarketAnalysis, chatWithAI } from '../services/ai';

interface AIAnalysisProps {
  symbol: string;
  price: number;
  change24h: number;
  technicalData: any;
}

export default function AIAnalysis({ symbol, price, change24h, technicalData }: AIAnalysisProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const { data: analysis, isLoading } = useQuery({
    queryKey: ['analysis', symbol, price],
    queryFn: () => getMarketAnalysis(symbol, price, change24h, technicalData),
    enabled: !!technicalData,
  });

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const context = {
      symbol,
      price,
      technicalData,
      history: chatHistory,
    };

    const response = await chatWithAI(message, context);
    setChatHistory([...chatHistory, `You: ${message}`, `AI: ${response}`]);
    setMessage('');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-semibold">AI Analysis</h2>
        </div>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="p-2 hover:bg-gray-700 rounded-lg"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <div className="prose prose-invert max-w-none">
          {analysis && <div className="whitespace-pre-wrap">{analysis}</div>}
        </div>
      )}

      {chatOpen && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <div className="h-48 overflow-y-auto mb-4 space-y-2">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded ${
                  msg.startsWith('You:') ? 'bg-gray-700' : 'bg-gray-600'
                }`}
              >
                {msg}
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about market conditions..."
              className="flex-1 bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded font-medium"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}