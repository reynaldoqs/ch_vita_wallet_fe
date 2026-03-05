import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, setUser } from "@/store/auth/authSlice";
import {
	type LoginRequest,
	type LoginResponse,
	loginRequestSchema,
	loginResponseSchema,
	type SignUpRequest,
	type SignUpResponse,
	signUpRequestSchema,
	signUpResponseSchema,
} from "@/types";
import { getZodErrorMessage } from "@/utils/error";

export const authService = createApi({
	reducerPath: "auth-api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/" }),
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (body) => {
				const parsedBody = loginRequestSchema.safeParse(body);
				if (!parsedBody.success)
					throw new Error(getZodErrorMessage(parsedBody.error));

				return {
					url: "auth/login",
					method: "POST",
					body: parsedBody.data,
				};
			},
			transformResponse: (response: LoginResponse) => {
				const parsed = loginResponseSchema.safeParse(response);
				if (!parsed.success) throw new Error(getZodErrorMessage(parsed.error));
				return parsed.data;
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setToken(data.token));
					dispatch(setUser(data.user));
				} catch {}
			},
		}),
		signUp: builder.mutation<SignUpResponse, SignUpRequest>({
			query: (body) => {
				const parsedBody = signUpRequestSchema.safeParse(body);
				if (!parsedBody.success)
					throw new Error(getZodErrorMessage(parsedBody.error));

				return {
					url: "auth/register",
					method: "POST",
					body: parsedBody.data,
				};
			},
			transformResponse: (response: unknown) => {
				const parsed = signUpResponseSchema.safeParse(response);
				if (!parsed.success) throw new Error(getZodErrorMessage(parsed.error));
				return parsed.data;
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setToken(data.token));
					dispatch(setUser(data.user));
				} catch {}
			},
		}),
	}),
});

export const { useLoginMutation, useSignUpMutation } = authService;
