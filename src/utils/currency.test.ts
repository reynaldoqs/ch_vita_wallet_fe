import { describe, expect, it } from "vitest";
import type { Balance, Prices } from "@/types";
import { flattenBalance, formatCurrency, getConvertedAmount } from "./currency";

const mockPrices: Prices = {
	BTC: {
		USD: { sell: "50000", buy: "49000" },
		CLP: { sell: "45000000", buy: "44000000" },
	},
	USDT: {
		USD: { sell: "1.01", buy: "0.99" },
		CLP: { sell: "910", buy: "900" },
	},
	USDC: {
		USD: { sell: "1.00", buy: "0.98" },
		CLP: { sell: "905", buy: "895" },
	},
};

describe("getConvertedAmount", () => {
	it("returns amount unchanged when from === to", () => {
		expect(getConvertedAmount(mockPrices, "USD", "USD", 100)).toBe(100);
	});

	it("returns amount unchanged when amount is 0", () => {
		expect(getConvertedAmount(mockPrices, "BTC", "USD", 0)).toBe(0);
	});

	it("returns amount unchanged when prices is undefined", () => {
		expect(getConvertedAmount(undefined, "BTC", "USD", 1)).toBe(1);
	});

	it("converts using sell rate when from currency is a base asset in prices", () => {
		// BTC.USD.sell = 50000, so 2 BTC → 100000 USD
		expect(getConvertedAmount(mockPrices, "BTC", "USD", 2)).toBe(100000);
	});

	it("converts using buy rate when to currency is a base asset in prices", () => {
		// BTC.USD.buy = 49000, so 98000 USD → 2 BTC
		expect(getConvertedAmount(mockPrices, "USD", "BTC", 98000)).toBe(2);
	});

	it("converts via shared base asset when neither currency is directly listed as key", () => {
		// USD → CLP via BTC: USD→BTC using BTC.USD.buy=49000, BTC→CLP using BTC.CLP.sell=45000000
		// 49000 USD / 49000 = 1 BTC * 45000000 = 45000000 CLP
		const result = getConvertedAmount(mockPrices, "USD", "CLP", 49000);
		expect(result).toBeCloseTo(45000000);
	});

	it("returns 0 when no conversion path exists", () => {
		const emptyPrices = { BTC: {}, USDT: {}, USDC: {} } as unknown as Prices;
		expect(getConvertedAmount(emptyPrices, "USD", "EUR", 100)).toBe(0);
	});
});

describe("formatCurrency", () => {
	it("formats an integer amount with two decimal places", () => {
		expect(formatCurrency(100, "BTC")).toBe("100,00");
	});

	it("adds $ prefix for USD", () => {
		expect(formatCurrency(100, "USD")).toBe("$ 100,00");
	});

	it("adds $ prefix for CLP", () => {
		expect(formatCurrency(1000, "CLP")).toBe("$ 1.000,00");
	});

	it("uses dot as thousands separator", () => {
		expect(formatCurrency(1000000, "BTC")).toBe("1.000.000,00");
	});

	it("uses comma as decimal separator", () => {
		expect(formatCurrency(1.5, "USDT")).toBe("1,50");
	});

	it("trims trailing zeros beyond two decimal places", () => {
		expect(formatCurrency(1.123456789, "BTC")).toBe("1,12345678");
	});

	it("does not add $ prefix for crypto currencies", () => {
		expect(formatCurrency(1, "BTC")).toBe("1,00");
		expect(formatCurrency(1, "USDT")).toBe("1,00");
		expect(formatCurrency(1, "USDC")).toBe("1,00");
	});
});

describe("flattenBalance", () => {
	it("returns empty array when rawBalance is undefined", () => {
		expect(flattenBalance(undefined)).toEqual([]);
	});

	it("returns currencies with non-zero balance", () => {
		const balance: Balance = {
			fiat: { USD: 100, CLP: 0 },
			crypto: { BTC: 0.5, USDT: 0, USDC: 0 },
		};
		const result = flattenBalance(balance);
		expect(result.some((e) => e.currency === "USD" && e.value === 100)).toBe(
			true,
		);
		expect(result.some((e) => e.currency === "BTC" && e.value === 0.5)).toBe(
			true,
		);
	});

	it("pads to minItems when fewer currencies have a balance", () => {
		const balance: Balance = {
			fiat: { USD: 50, CLP: 0 },
			crypto: { BTC: 0, USDT: 0, USDC: 0 },
		};
		const result = flattenBalance(balance, 3);
		expect(result).toHaveLength(3);
	});

	it("returns at least minItems entries even when all balances are zero", () => {
		const balance: Balance = {
			fiat: { USD: 0, CLP: 0 },
			crypto: { BTC: 0, USDT: 0, USDC: 0 },
		};
		const result = flattenBalance(balance, 3);
		expect(result).toHaveLength(3);
	});

	it("puts currencies with balance before zero-balance currencies", () => {
		const balance: Balance = {
			fiat: { USD: 0, CLP: 0 },
			crypto: { BTC: 1, USDT: 0, USDC: 0 },
		};
		const result = flattenBalance(balance, 3);
		expect(result[0].currency).toBe("BTC");
	});
});
