import { CryptoData, RecommendationCriteria } from '@/types/crypto';
import { cryptoDatabase, getAllCryptos } from '@/data/cryptoDatabase';

export class CryptoBuddyBot {
  private cryptos: CryptoData[];

  constructor() {
    this.cryptos = getAllCryptos();
  }

  analyzeQuery(query: string): RecommendationCriteria {
    const lowerQuery = query.toLowerCase();
    
    // Sustainability keywords
    if (lowerQuery.includes('sustainable') || lowerQuery.includes('green') || 
        lowerQuery.includes('eco') || lowerQuery.includes('environment')) {
      return { type: 'sustainability', priority: 'high' };
    }
    
    // Profitability keywords
    if (lowerQuery.includes('profit') || lowerQuery.includes('money') || 
        lowerQuery.includes('invest') || lowerQuery.includes('buy') || 
        lowerQuery.includes('growth') || lowerQuery.includes('rising')) {
      return { type: 'profitability', priority: 'high' };
    }
    
    // Trending keywords
    if (lowerQuery.includes('trending') || lowerQuery.includes('hot') || 
        lowerQuery.includes('popular') || lowerQuery.includes('buzz')) {
      return { type: 'trending', priority: 'high' };
    }
    
    // Default to balanced
    return { type: 'balanced', priority: 'medium' };
  }

  getRecommendation(criteria: RecommendationCriteria): { crypto: CryptoData; reason: string } {
    let recommendedCrypto: CryptoData;
    let reason: string;

    switch (criteria.type) {
      case 'sustainability':
        recommendedCrypto = this.cryptos.reduce((best, current) => 
          current.sustainability_score > best.sustainability_score ? current : best
        );
        reason = `🌱 ${recommendedCrypto.name} has the highest sustainability score (${recommendedCrypto.sustainability_score}/10) with ${recommendedCrypto.energy_use} energy usage!`;
        break;

      case 'profitability':
        // Prioritize rising trend + high market cap
        const profitableCryptos = this.cryptos.filter(crypto => 
          crypto.price_trend === 'rising' && 
          (crypto.market_cap === 'high' || crypto.market_cap === 'medium')
        );
        recommendedCrypto = profitableCryptos[0] || this.cryptos[0];
        reason = `📈 ${recommendedCrypto.name} is ${recommendedCrypto.price_trend} with a ${recommendedCrypto.market_cap} market cap - great for potential profits!`;
        break;

      case 'trending':
        // Focus on rising cryptos
        const trendingCryptos = this.cryptos.filter(crypto => crypto.price_trend === 'rising');
        recommendedCrypto = trendingCryptos[0] || this.cryptos[0];
        reason = `🚀 ${recommendedCrypto.name} is currently trending ${recommendedCrypto.price_trend} and gaining momentum!`;
        break;

      default:
        // Balanced approach - good sustainability + rising trend
        const balancedCryptos = this.cryptos.filter(crypto => 
          crypto.sustainability_score >= 6 && crypto.price_trend === 'rising'
        );
        recommendedCrypto = balancedCryptos[0] || this.cryptos[2]; // Default to Cardano
        reason = `⚖️ ${recommendedCrypto.name} offers a great balance of sustainability (${recommendedCrypto.sustainability_score}/10) and growth potential!`;
        break;
    }

    return { crypto: recommendedCrypto, reason };
  }

  generateResponse(query: string): string {
    const criteria = this.analyzeQuery(query);
    const { crypto, reason } = this.getRecommendation(criteria);

    const responses = [
      `Hey there! 👋 ${reason}`,
      `Looking at the data... ${reason}`,
      `Great question! 🤔 ${reason}`,
      `Based on current trends... ${reason}`
    ];

    const baseResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add crypto details
    const details = [
      `\n\n💰 Current price: ${crypto.current_price}`,
      `📊 Market cap: ${crypto.market_cap}`,
      `⚡ Energy use: ${crypto.energy_use}`,
      `🌍 Sustainability: ${crypto.sustainability_score}/10`
    ].join('\n');

    // Add pros
    const pros = crypto.pros ? `\n\n✅ Why it's good:\n${crypto.pros.map(pro => `• ${pro}`).join('\n')}` : '';
    
    // Add disclaimer
    const disclaimer = '\n\n⚠️ Remember: Crypto investing is risky - always do your own research and never invest more than you can afford to lose!';

    return baseResponse + details + pros + disclaimer;
  }

  getGreeting(): string {
    const greetings = [
      "Hey there! I'm CryptoBuddy 🤖💰 Ready to explore the crypto world together?",
      "Welcome to CryptoBuddy! 🚀 Ask me about crypto investments, sustainability, or trends!",
      "Hi! I'm your friendly crypto advisor 💎 What would you like to know about digital currencies?",
      "Greetings, crypto explorer! 🌟 I'm here to help you navigate the blockchain universe!"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  getRandomTip(): string {
    const tips = [
      "💡 Tip: Diversification is key - don't put all your eggs in one crypto basket!",
      "🔍 Always research the team and technology behind a cryptocurrency before investing.",
      "📊 Dollar-cost averaging can help reduce the impact of volatility.",
      "🌱 Consider the environmental impact - some cryptos are much more sustainable than others!",
      "⏰ The crypto market never sleeps - but you should! Don't let FOMO drive your decisions."
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  }
}