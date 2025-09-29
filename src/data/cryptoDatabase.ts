import { CryptoData } from '@/types/crypto';

export const cryptoDatabase: Record<string, CryptoData> = {
  Bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    price_trend: 'rising',
    market_cap: 'high',
    energy_use: 'high',
    sustainability_score: 3,
    current_price: '$43,250',
    description: 'The original cryptocurrency and digital gold standard.',
    pros: ['Most established', 'Highest market cap', 'Store of value', 'Institutional adoption'],
    cons: ['High energy consumption', 'Slow transaction times', 'Price volatility']
  },
  Ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    price_trend: 'stable',
    market_cap: 'high',
    energy_use: 'medium',
    sustainability_score: 6,
    current_price: '$2,650',
    description: 'Smart contract platform powering DeFi and NFTs.',
    pros: ['Smart contracts', 'DeFi ecosystem', 'Developer community', 'Proof of Stake'],
    cons: ['Gas fees', 'Network congestion', 'Competition from other chains']
  },
  Cardano: {
    name: 'Cardano',
    symbol: 'ADA',
    price_trend: 'rising',
    market_cap: 'medium',
    energy_use: 'low',
    sustainability_score: 9,
    current_price: '$0.48',
    description: 'Research-driven blockchain with focus on sustainability.',
    pros: ['Eco-friendly', 'Academic approach', 'Low fees', 'Proof of Stake'],
    cons: ['Slower development', 'Limited DeFi ecosystem', 'Lower adoption']
  },
  Solana: {
    name: 'Solana',
    symbol: 'SOL',
    price_trend: 'rising',
    market_cap: 'high',
    energy_use: 'low',
    sustainability_score: 7,
    current_price: '$105',
    description: 'High-speed blockchain for web3 applications.',
    pros: ['Fast transactions', 'Low fees', 'Growing ecosystem', 'Energy efficient'],
    cons: ['Network outages', 'Centralization concerns', 'Competition']
  },
  Polygon: {
    name: 'Polygon',
    symbol: 'MATIC',
    price_trend: 'stable',
    market_cap: 'medium',
    energy_use: 'low',
    sustainability_score: 8,
    current_price: '$0.85',
    description: 'Ethereum scaling solution and multi-chain platform.',
    pros: ['Ethereum compatibility', 'Low fees', 'Fast transactions', 'Green blockchain'],
    cons: ['Dependent on Ethereum', 'Competition from other L2s']
  },
  Chainlink: {
    name: 'Chainlink',
    symbol: 'LINK',
    price_trend: 'rising',
    market_cap: 'medium',
    energy_use: 'medium',
    sustainability_score: 6,
    current_price: '$15.20',
    description: 'Decentralized oracle network connecting blockchains to real-world data.',
    pros: ['First-mover advantage', 'Wide adoption', 'Essential infrastructure'],
    cons: ['Token economics questions', 'Competition from other oracles']
  }
};

export const getCryptoByName = (name: string): CryptoData | null => {
  const key = Object.keys(cryptoDatabase).find(
    key => key.toLowerCase() === name.toLowerCase()
  );
  return key ? cryptoDatabase[key] : null;
};

export const getAllCryptos = (): CryptoData[] => {
  return Object.values(cryptoDatabase);
};