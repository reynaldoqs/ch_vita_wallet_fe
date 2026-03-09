export const CURRENCY_SYMBOLS: Record<string, string> = {
	USD: "Dólar",
	CLP: "Peso Chileno",
	USDT: "Tether",
	BTC: "Bitcoin",
	USDC: "USD Coin",
	ARS: "Peso Argentino",
	BRL: "Real Brasileño",
	CAD: "Dólar Canadiense",
	CHF: "Franco Suizo",
	COP: "Peso Colombiano",
	CZK: "Corona Checa",
	DKK: "Corona Danesa",
	EUR: "Euro",
	GBP: "Libra Esterlina",
	HKD: "Dólar Hong Kong",
	HUF: "Forinto Húngaro",
	JPY: "Yen Japonés",
	KRW: "Won Surcoreano",
	MXN: "Peso Mexicano",
	NOK: "Corona Noruega",
	NZD: "Dólar Neozelandés",
	PLN: "Zloty Polaco",
	RON: "Leu Rumano",
	SEK: "Corona Sueca",
	BOB: "Boliviano",
} as const;

export const CURRENCIES = ["USD", "CLP", "BTC", "USDT", "USDC"] as const;

export const CRYPTO_CURRENCIES = ["BTC", "USDT", "USDC"] as const;

export const FIAT_CURRENCIES = ["USD", "CLP"] as const;

export const CURRENCY_LABELS: Record<(typeof CURRENCIES)[number], string> = {
	USD: CURRENCY_SYMBOLS.USD,
	CLP: CURRENCY_SYMBOLS.CLP,
	USDT: CURRENCY_SYMBOLS.USDT,
	BTC: CURRENCY_SYMBOLS.BTC,
	USDC: CURRENCY_SYMBOLS.USDC,
};
