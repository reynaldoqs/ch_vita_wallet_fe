import { useRef, useState } from "react";
import { useBalancesQuery, useCurrencyRatesQuery } from "@/services";
import type { Balance } from "@/types";
import {
	CRYPTO_CURRENCIES,
	CURRENCIES,
	FIAT_CURRENCIES,
} from "@/utils/constants";
import { getConvertedAmount } from "@/utils/currency";

type Currency = (typeof CURRENCIES)[number];

function isFiat(c: Currency): boolean {
	return (FIAT_CURRENCIES as readonly string[]).includes(c);
}

function oppositeCurrencies(c: Currency): readonly Currency[] {
	return isFiat(c) ? CRYPTO_CURRENCIES : FIAT_CURRENCIES;
}

function defaultOpposite(c: Currency): Currency {
	return oppositeCurrencies(c)[0];
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

	const [fromCurrency, setFromCurrencyState] = useState<Currency>("USD");
	const [toCurrency, setToCurrencyState] = useState<Currency>("BTC");
	const [fromAmount, setFromAmountState] = useState(0);
	const [toAmount, setToAmountState] = useState(0);

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

	const setFromCurrency = (c: Currency) => {
		const { prices: p, toCurrency: tc, fromAmount: fa } = ref.current;
		const newTo = isFiat(c) === isFiat(tc) ? defaultOpposite(c) : tc;
		setFromCurrencyState(c);
		setToCurrencyState(newTo);
		setToAmountState(getConvertedAmount(p, c, newTo, fa));
	};

	const setToCurrency = (c: Currency) => {
		const { prices: p, fromCurrency: fc, toAmount: ta } = ref.current;
		const newFrom = isFiat(c) === isFiat(fc) ? defaultOpposite(c) : fc;
		setToCurrencyState(c);
		setFromCurrencyState(newFrom);
		setFromAmountState(getConvertedAmount(p, newFrom, c, ta));
	};

	const fromOptions = CURRENCIES;
	const toOptions = oppositeCurrencies(fromCurrency);
	const rate = prices
		? getConvertedAmount(prices, fromCurrency, toCurrency, 1)
		: 0;

	return {
		fromCurrency,
		setFromCurrency,
		toCurrency,
		setToCurrency,
		fromAmount,
		setFromAmount,
		toAmount,
		setToAmount,
		fromOptions,
		toOptions,
		availableBalance: getBalanceForCurrency(balance, fromCurrency),
		rate,
		formattedValidUntil: validUntil
			? new Date(validUntil).toLocaleString()
			: "",
	};
}
