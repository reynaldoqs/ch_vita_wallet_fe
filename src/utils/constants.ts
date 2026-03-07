export const CURRENCIES = ["USD", "CLP", "BTC", "USDT", "USDC"] as const;

export const CRYPTO_CURRENCIES = ["BTC", "USDT", "USDC"] as const;

export const FIAT_CURRENCIES = ["USD", "CLP"] as const;

export const CURRENCY_LABELS: Record<(typeof CURRENCIES)[number], string> = {
	USD: "Dólar",
	CLP: "Peso Chileno",
	USDT: "Tether",
	BTC: "Bitcoin",
	USDC: "USD Coin",
};
