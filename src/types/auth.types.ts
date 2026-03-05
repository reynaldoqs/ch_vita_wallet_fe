import { z } from "zod";

export const userSchema = z.object({
	id: z.number(),
	email: z.email(),
});

export type User = z.infer<typeof userSchema>;

export const signUpRequestSchema = z
	.object({
		email: z.email(),
		password: z.string().min(8),
		password_confirmation: z.string(),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "Passwords must match",
		path: ["password_confirmation"],
	});

export type SignUpRequest = z.infer<typeof signUpRequestSchema>;

export const signUpResponseSchema = z.object({
	token: z.string(),
	user: userSchema,
});

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;

export const loginRequestSchema = z.object({
	email: z.email(),
	password: z.string(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const loginResponseSchema = z.object({
	token: z.string(),
	user: userSchema,
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export type AuthApiError = { message?: string };
