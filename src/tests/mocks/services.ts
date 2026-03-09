/**
 * Reusable mock helpers for @/services.
 *
 * Usage in a test file:
 *
 *   vi.mock("@/services");          // no factory needed — uses src/services/__mocks__/index.ts
 *
 *   beforeEach(() => setupServiceMocks());
 *
 * Override defaults per-test:
 *
 *   setupServiceMocks({ pricesData: undefined });
 *   setupServiceMocks({ balanceData: { fiat: { USD: 0 }, crypto: {} } });
 */
import { vi } from "vitest";
import { useBalancesQuery, useCurrencyRatesQuery } from "@/services";
import type { Balance, Prices } from "@/types";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

/** Sample prices fixture (sell/buy as strings matching Prices type). */
export const mockPrices: Prices = {
	BTC: {
		USD: { sell: "50000", buy: "49000" },
		CLP: { sell: "40000000", buy: "39000000" },
	},
	USDT: {
		USD: { sell: "1", buy: "1" },
		CLP: { sell: "900", buy: "880" },
	},
	USDC: {
		USD: { sell: "1", buy: "1" },
		CLP: { sell: "900", buy: "880" },
	},
};

export const mockBalance: Balance = {
	fiat: { USD: 500, CLP: 1_000_000 },
	crypto: { BTC: 0.5 },
};

export const MOCK_VALID_UNTIL = "2026-03-08T12:00:00.000Z";

// ---------------------------------------------------------------------------
// Setup helper — call inside beforeEach / per-test
// ---------------------------------------------------------------------------

interface ServiceMockOverrides {
	/** Pass `undefined` explicitly to simulate "no data loaded yet". */
	pricesData?: { prices: Prices; valid_until: string } | undefined;
	/** Pass `undefined` explicitly to simulate "no data loaded yet". */
	balanceData?: Balance | undefined;
}

/**
 * Configures the mocked service hooks with default (or overridden) return values.
 * Must be called after `vi.mock("@/services")` has been declared in the test file.
 *
 * Uses `in` checks so that explicitly passing `undefined` works as expected
 * (JS destructuring defaults kick in for `undefined`, which would silently
 * ignore `setupServiceMocks({ pricesData: undefined })`).
 */
export function setupServiceMocks(overrides: ServiceMockOverrides = {}) {
	const pricesData =
		"pricesData" in overrides
			? overrides.pricesData
			: { prices: mockPrices, valid_until: MOCK_VALID_UNTIL };

	const balanceData =
		"balanceData" in overrides ? overrides.balanceData : mockBalance;

	vi.mocked(useCurrencyRatesQuery).mockReturnValue({
		data: pricesData,
	} as unknown as ReturnType<typeof useCurrencyRatesQuery>);

	vi.mocked(useBalancesQuery).mockReturnValue({
		data: balanceData,
	} as unknown as ReturnType<typeof useBalancesQuery>);
}
