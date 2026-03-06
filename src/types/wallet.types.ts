import { z } from "zod";

/** Amount schema */
const amountSchema = z.string().transform((s) => Number(s));
const fiatBalancesSchema = z.record(z.string(), amountSchema);
const cryptoBalancesSchema = z.record(z.string(), amountSchema);

export const balanceSchema = z.object({
	fiat: fiatBalancesSchema,
	crypto: cryptoBalancesSchema,
});

export type FiatBalances = z.infer<typeof fiatBalancesSchema>;
export type CryptoBalances = z.infer<typeof cryptoBalancesSchema>;
export type Balance = z.infer<typeof balanceSchema>;

/** Currency rates schema */
export const currencyRatesSchema = z.object({
	clp_sell: z.string(),
	clp_buy: z.string(),
	cop_sell: z.string(),
	cop_buy: z.string(),
	ars_sell: z.string(),
	ars_buy: z.string(),
	eur_sell: z.string(),
	eur_buy: z.string(),
	usd_sell: z.string(),
	usd_buy: z.string(),
	mxn_sell: z.string(),
	mxn_buy: z.string(),
	brl_sell: z.string(),
	brl_buy: z.string(),
	btc_sell: z.string().optional(),
	btc_buy: z.string().optional(),
	usdc_sell: z.string().optional(),
	usdc_buy: z.string().optional(),
	usdt_sell: z.string().optional(),
	usdt_buy: z.string().optional(),
});

export const ratesSchema = z.object({
	usdc: currencyRatesSchema,
	btc: currencyRatesSchema,
	usdt: currencyRatesSchema,
});

export type CurrencyRates = z.infer<typeof currencyRatesSchema>;
export type Rates = z.infer<typeof ratesSchema>;

export const transactionSchema = z.object({
	id: z.number(),
	from_currency: z.string(),
	to_currency: z.string(),
	from_amount: z.string(),
	to_amount: z.string(),
	exchange_rate: z.string(),
	status: z.string(),
	created_at: z.string(),
});

export const transactionsMetaSchema = z.object({
	current_page: z.number(),
	total_pages: z.number(),
	total_count: z.number(),
});

export const transactionsResponseSchema = z.object({
	transactions: z.array(transactionSchema),
	meta: transactionsMetaSchema,
});

export type Transaction = z.infer<typeof transactionSchema>;
export type TransactionsMeta = z.infer<typeof transactionsMetaSchema>;
export type TransactionsResponse = z.infer<typeof transactionsResponseSchema>;
