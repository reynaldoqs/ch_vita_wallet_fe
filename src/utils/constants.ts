import type { CurrencyIconName } from "@/components/atoms";

export const CURRENCIES = ["USD", "EUR", "GBP"] as const;
export const CURRENCY_LABELS: Record<CurrencyIconName, string> = {
	USD: "Dólar",
	CLP: "Peso Chileno",
	USDT: "Tether",
	BTC: "Bitcoin",
	USDC: "USD Coin",
};
