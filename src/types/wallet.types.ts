import { z } from "zod";

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
