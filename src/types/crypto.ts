export interface CryptoData {
  name: string;
  symbol: string;
  price_trend: 'rising' | 'falling' | 'stable';
  market_cap: 'high' | 'medium' | 'low';
  energy_use: 'high' | 'medium' | 'low';
  sustainability_score: number; // 0-10 scale
  current_price?: string;
  description?: string;
  pros?: string[];
  cons?: string[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface RecommendationCriteria {
  type: 'profitability' | 'sustainability' | 'balanced' | 'trending';
  priority: 'high' | 'medium' | 'low';
}