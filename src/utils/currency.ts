import type { Balance, Prices } from "@/types";
import { CRYPTO_CURRENCIES, CURRENCIES } from "./constants";

const BASE_ASSETS = CRYPTO_CURRENCIES;

export function getConvertedAmount(
	prices: Prices | undefined,
	from: string,
	to: string,
	amount: number,
): number {
	if (!prices || from === to || amount === 0) return amount;

	if (from in prices && prices[from as keyof Prices][to] !== undefined) {
		const sellRate = Number(prices[from as keyof Prices][to].sell);
		return amount * sellRate;
	}

	if (to in prices && prices[to as keyof Prices][from] !== undefined) {
		const buyRate = Number(prices[to as keyof Prices][from].buy);
		return amount / buyRate;
	}

	for (const baseKey of BASE_ASSETS) {
		const rates = prices[baseKey];
		const fromRate = rates?.[from];
		const toRate = rates?.[to];
		if (fromRate && toRate) {
			const amountInBase = amount / Number(fromRate.buy);
			return amountInBase * Number(toRate.sell);
		}
	}

	return 0;
}

export function formatCurrency(amount: number, currency: string): string {
	const maxDecimals = 10;
	const fixed = amount.toFixed(maxDecimals);
	const [intStr, decStr] = fixed.split(".");
	const decTrimmed = decStr.replace(/0+$/, "") || "00";
	const dec =
		decTrimmed.length <= 2 ? decTrimmed.padEnd(2, "0") : decTrimmed.slice(0, 8);
	const intFormatted = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	const formatted = `${intFormatted},${dec}`;
	const isDollar = /^(USD|CLP)$/i.test(currency);
	return isDollar ? `$ ${formatted}` : formatted;
}

export type CurrencyEntry = {
	currency: (typeof CURRENCIES)[number];
	value: number;
};

export function flattenBalance(
	rawBalance: Balance | undefined,
	minItems: number = 3,
): CurrencyEntry[] {
	if (!rawBalance) return [];
	const merged: Record<string, number> = {
		...rawBalance.fiat,
		...rawBalance.crypto,
	};
	const withBalance = CURRENCIES.filter((c) => (merged[c] ?? 0) > 0);
	const rest = CURRENCIES.filter((c) => !withBalance.includes(c));
	const keys =
		withBalance.length >= minItems
			? withBalance
			: [...withBalance, ...rest.slice(0, minItems - withBalance.length)];
	return keys.map((c) => ({ currency: c, value: merged[c] ?? 0 }));
}
