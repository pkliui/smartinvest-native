// Live market data from CoinGecko's free public API (no key required).
// Docs: https://docs.coingecko.com/reference/coins-markets

const COIN_IDS = ['bitcoin', 'ethereum', 'solana', 'cardano', 'dogecoin'];

export interface MarketCoin {
  id: string;
  symbol: string; // e.g. "BTC"
  name: string; // e.g. "Bitcoin"
  image: string; // icon URL
  price: number; // USD
  change24h: number; // percent, can be negative
}

// Shape of the fields we read from the CoinGecko response.
interface RawCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number | null;
}

export async function fetchMarkets(): Promise<MarketCoin[]> {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets' +
    `?vs_currency=usd&ids=${COIN_IDS.join(',')}` +
    '&order=market_cap_desc&price_change_percentage=24h';

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  const data: RawCoin[] = await res.json();

  return data.map((c) => ({
    id: c.id,
    symbol: c.symbol.toUpperCase(),
    name: c.name,
    image: c.image,
    price: c.current_price,
    change24h: c.price_change_percentage_24h ?? 0,
  }));
}

// "$65,283.00" / "$1,767.49"
export function formatPrice(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value < 1 ? 4 : 2,
  });
}

// "+2.00%" / "-1.34%"
export function formatChange(pct: number): string {
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(2)}%`;
}
