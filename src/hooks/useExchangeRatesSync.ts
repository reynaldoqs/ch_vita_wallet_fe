import { useRef, useState } from "react";
import { useBalancesQuery, useCurrencyRatesQuery } from "@/services";
import type { Balance, Prices } from "@/types";
import type { CURRENCIES } from "@/utils/constants";

const BASE_ASSETS = ["btc", "usdc", "usdt"] as const;
const BASE_MAP: Record<string, (typeof BASE_ASSETS)[number]> = {
	BTC: "btc",
	USDC: "usdc",
	USDT: "usdt",
};

function getConvertedAmount(
	prices: Prices | undefined,
	fromCurrency: string,
	toCurrency: string,
	fromAmount: number,
): number {
	if (!prices || fromCurrency === toCurrency || fromAmount === 0)
		return fromAmount;
	const from = fromCurrency.toUpperCase();
	const to = toCurrency.toUpperCase();

	const fromBase = BASE_MAP[from];
	const toBase = BASE_MAP[to];
	if (fromBase && prices[fromBase][to] !== undefined) {
		const rate = Number(prices[fromBase][to].sell);
		return fromAmount * rate;
	}
	if (toBase && prices[toBase][from] !== undefined) {
		const rate = Number(prices[toBase][from].buy);
		return fromAmount / rate;
	}
	for (const base of BASE_ASSETS) {
		const asset = prices[base];
		if (asset?.[from] && asset?.[to]) {
			const toBaseAmount = fromAmount / Number(asset[from].buy);
			return toBaseAmount * Number(asset[to].sell);
		}
	}
	return 0;
}

function getExchangeRate(
	prices: Prices | undefined,
	fromCurrency: string,
	toCurrency: string,
): number {
	if (!prices || fromCurrency === toCurrency) return 1;
	return getConvertedAmount(prices, fromCurrency, toCurrency, 1);
}

function getBalanceForCurrency(
	balance: Balance | undefined,
	currency: string,
): number {
	if (!balance) return 0;
	return (balance.fiat?.[currency] ??
		balance.crypto?.[currency] ??
		0) as number;
}

export function useExchangeRatesSync() {
	const { data: pricesResponse } = useCurrencyRatesQuery();
	const { data: balance } = useBalancesQuery();
	const prices = pricesResponse?.prices;
	const validUntil = pricesResponse?.valid_until;

	const [fromCurrency, setFromCurrencyState] =
		useState<(typeof CURRENCIES)[number]>("USD");
	const [toCurrency, setToCurrencyState] =
		useState<(typeof CURRENCIES)[number]>("BTC");
	const [fromAmount, setFromAmountState] = useState<number>(0);
	const [toAmount, setToAmountState] = useState<number>(0);

	const ref = useRef({
		prices,
		fromCurrency,
		toCurrency,
		fromAmount,
		toAmount,
	});
	ref.current = {
		prices,
		fromCurrency,
		toCurrency,
		fromAmount,
		toAmount,
	};

	const setFromAmount = (amount: number) => {
		const { prices: p, fromCurrency: fc, toCurrency: tc } = ref.current;
		setFromAmountState(amount);
		setToAmountState(getConvertedAmount(p, fc, tc, amount));
	};
	const setToAmount = (amount: number) => {
		const { prices: p, toCurrency: tc, fromCurrency: fc } = ref.current;
		setToAmountState(amount);
		setFromAmountState(getConvertedAmount(p, tc, fc, amount));
	};
	const setFromCurrency = (c: (typeof CURRENCIES)[number]) => {
		const { prices: p, toCurrency: tc, fromAmount: fa } = ref.current;
		setFromCurrencyState(c);
		setToAmountState(getConvertedAmount(p, c, tc, fa));
	};
	const setToCurrency = (c: (typeof CURRENCIES)[number]) => {
		const { prices: p, fromCurrency: fc, toAmount: ta } = ref.current;
		setToCurrencyState(c);
		setFromAmountState(getConvertedAmount(p, c, fc, ta));
	};

	const availableBalance = getBalanceForCurrency(balance, fromCurrency);
	const rate = getExchangeRate(prices, fromCurrency, toCurrency);
	const formattedValidUntil = validUntil
		? new Date(validUntil).toLocaleString()
		: "";
	return {
		fromCurrency,
		setFromCurrency,
		toCurrency,
		setToCurrency,
		fromAmount,
		setFromAmount,
		toAmount,
		setToAmount,
		availableBalance,
		rate,
		formattedValidUntil,
	};
}
