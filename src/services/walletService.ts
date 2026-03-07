import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";
import {
	type Balance,
	balanceSchema,
	type ExchangeRequestBody,
	type ExchangeResponse,
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
		transactions: builder.query<
			TransactionsResponse,
			{ page?: number; per_page?: number; status?: string }
		>({
			query: ({ page = 1, per_page = 10, status } = {}) => {
				const params = new URLSearchParams({
					page: String(page),
					per_page: String(per_page),
				});
				if (status) params.set("status", status);
				return `transactions?${params.toString()}`;
			},
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
		exchange: builder.mutation<ExchangeResponse, ExchangeRequestBody>({
			query: (body) => {
				return {
					url: "exchange",
					method: "POST",
					body: body,
				};
			},
		}),
	}),
});

export const {
	useBalancesQuery,
	useCurrencyRatesQuery,
	useTransactionsQuery,
	useExchangeMutation,
} = walletService;
