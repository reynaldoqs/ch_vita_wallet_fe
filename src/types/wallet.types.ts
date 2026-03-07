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

/** Prices schema (sell/buy per currency) */
export const pricePairSchema = z.object({
	sell: z.string(),
	buy: z.string(),
});
export const assetPricesSchema = z.record(z.string(), pricePairSchema);
export const pricesSchema = z.object({
	btc: assetPricesSchema,
	usdc: assetPricesSchema,
	usdt: assetPricesSchema,
});
export const pricesResponseSchema = z.object({
	prices: pricesSchema,
	valid_until: z.string(),
});

export type PricePair = z.infer<typeof pricePairSchema>;
export type AssetPrices = z.infer<typeof assetPricesSchema>;
export type Prices = z.infer<typeof pricesSchema>;
export type PricesResponse = z.infer<typeof pricesResponseSchema>;

/** Transactions schema */
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
