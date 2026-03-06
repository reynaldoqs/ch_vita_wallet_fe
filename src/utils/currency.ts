import type { Balance } from "@/types";
import { CURRENCIES } from "./constants";

export function formatCurrency(amount: number, currency: string): string {
	const [int, dec] = amount.toFixed(2).split(".");
	const intFormatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
