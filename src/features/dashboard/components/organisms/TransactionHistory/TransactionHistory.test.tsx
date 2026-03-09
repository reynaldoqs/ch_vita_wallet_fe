import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTransactionsQuery } from "@/services";
import { setupServiceMocks } from "@/tests/mocks/services";
import { renderWithProviders, screen } from "@/tests/test-utils";
import type { Transaction, TransactionsResponse } from "@/types";
import { TransactionHistory } from "./TransactionHistory";

vi.mock("@/services");
beforeEach(() => setupServiceMocks());

const mockTransaction: Transaction = {
	id: 1,
	from_currency: "USD",
	to_currency: "CLP",
	from_amount: "100",
	to_amount: "50000",
	exchange_rate: "500",
	status: "completed",
	created_at: "2026-03-08T12:00:00.000Z",
};

function mockTransactionsResponse(
	transactions: Transaction[],
): TransactionsResponse {
	return {
		transactions,
		meta: { current_page: 1, total_pages: 1, total_count: transactions.length },
	};
}

describe("TransactionHistory", () => {
	it("renders the section title", () => {
		vi.mocked(useTransactionsQuery).mockReturnValue({
			data: mockTransactionsResponse([]),
			isLoading: false,
			isFetching: false,
		} as unknown as ReturnType<typeof useTransactionsQuery>);
		renderWithProviders(<TransactionHistory />);
		expect(screen.getByText("Historial")).toBeInTheDocument();
	});

	it("shows empty state when no transactions", () => {
		vi.mocked(useTransactionsQuery).mockReturnValue({
			data: mockTransactionsResponse([]),
			isLoading: false,
			isFetching: false,
		} as unknown as ReturnType<typeof useTransactionsQuery>);
		renderWithProviders(<TransactionHistory />);
		expect(screen.getByText("No hay transacciones")).toBeInTheDocument();
	});

	it("renders transactions when data is provided", () => {
		vi.mocked(useTransactionsQuery).mockReturnValue({
			data: mockTransactionsResponse([mockTransaction]),
			isLoading: false,
			isFetching: false,
		} as unknown as ReturnType<typeof useTransactionsQuery>);
		renderWithProviders(<TransactionHistory />);
		expect(
			screen.getByLabelText("Historial de transacciones"),
		).toBeInTheDocument();
		expect(screen.getByText("Intercambiaste")).toBeInTheDocument();
	});

	it("shows status filter options", () => {
		vi.mocked(useTransactionsQuery).mockReturnValue({
			data: mockTransactionsResponse([]),
			isLoading: false,
			isFetching: false,
		} as unknown as ReturnType<typeof useTransactionsQuery>);
		renderWithProviders(<TransactionHistory />);
		expect(screen.getByText("Completado")).toBeInTheDocument();
		expect(screen.getByText("Pendiente")).toBeInTheDocument();
		expect(screen.getByText("Rechazado")).toBeInTheDocument();
	});
});
