import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";
import {
	type Balance,
	balanceSchema,
	type PricesResponse,
	pricesResponseSchema,
	type TransactionsResponse,
	transactionsResponseSchema,
} from "@/types";
import { getZodErrorMessage } from "@/utils/error";

export const walletService = createApi({
	reducerPath: "wallet-api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000/api/v1/",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			if (!headers.has("Content-Type")) {
				headers.set("Content-Type", "application/json");
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		balances: builder.query<Balance, void>({
			query: () => "wallet/balances",
			keepUnusedDataFor: 0,
			transformResponse: (response: unknown) => {
				console.log("response balances", response);
				const parsed = balanceSchema.safeParse(response);
				if (!parsed.success) throw new Error(getZodErrorMessage(parsed.error));
				return parsed.data;
			},
		}),
		transactions: builder.query<TransactionsResponse, void>({
			query: () => "transactions",
			keepUnusedDataFor: 0,
			transformResponse: (response: unknown) => {
				const parsed = transactionsResponseSchema.safeParse(response);
				if (!parsed.success) throw new Error(getZodErrorMessage(parsed.error));
				return parsed.data;
			},
		}),
		currencyRates: builder.query<PricesResponse, void>({
			query: () => "prices",
			keepUnusedDataFor: 60 * 60 * 2,
			transformResponse: (response: unknown) => {
				const parsed = pricesResponseSchema.safeParse(response);
				if (!parsed.success) throw new Error(getZodErrorMessage(parsed.error));
				return parsed.data;
			},
		}),
	}),
});

export const { useBalancesQuery, useCurrencyRatesQuery, useTransactionsQuery } =
	walletService;
