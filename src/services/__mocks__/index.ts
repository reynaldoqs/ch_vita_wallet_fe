/**
 * Automatic Vitest mock for @/services.
 *
 * Vitest uses this file whenever a test calls `vi.mock("@/services")` (no factory needed).
 * Every exported hook is a `vi.fn()` stub, ready to be configured via `vi.mocked(hook).mockReturnValue(...)`.
 *
 * Configure return values in beforeEach using the helper from @/tests/mocks/services:
 *
 *   vi.mock("@/services");
 *   beforeEach(() => setupServiceMocks());
 */
import { vi } from "vitest";

// wallet hooks
export const useBalancesQuery = vi.fn();
export const useCurrencyRatesQuery = vi.fn();
export const useTransactionsQuery = vi.fn();
export const useExchangeMutation = vi.fn();

// auth hooks
export const useLoginMutation = vi.fn();
export const useSignUpMutation = vi.fn();

const noopReducer = () => ({});
const noopMiddleware =
	() => () => (next: (a: unknown) => unknown) => (action: unknown) =>
		next(action);

export const walletService = {
	reducerPath: "wallet-api",
	reducer: noopReducer,
	middleware: noopMiddleware,
};
export const authService = {
	reducerPath: "auth-api",
	reducer: noopReducer,
	middleware:
		() => () => (next: (a: unknown) => unknown) => (action: unknown) =>
			next(action),
};
