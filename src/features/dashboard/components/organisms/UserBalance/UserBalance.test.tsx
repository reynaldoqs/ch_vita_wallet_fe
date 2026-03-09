import { beforeEach, describe, expect, it, vi } from "vitest";
import { useBalancesQuery } from "@/services";
import { setupServiceMocks } from "@/tests/mocks/services";
import { renderWithProviders, screen } from "@/tests/test-utils";
import { formatCurrency } from "@/utils/currency";
import { UserBalance } from "./UserBalance";

vi.mock("@/services");
beforeEach(() => setupServiceMocks());

describe("UserBalance", () => {
	it("renders the user", () => {
		renderWithProviders(<UserBalance />);
		expect(screen.getByText("Mis saldos")).toBeInTheDocument();
	});

	it("renders custom balance when provided via setupServiceMocks", () => {
		setupServiceMocks({
			balanceData: {
				fiat: { USD: 100, CLP: 5000 },
				crypto: {
					BTC: 0.5,
				},
			},
		});
		renderWithProviders(<UserBalance />);
		expect(screen.getByText(formatCurrency(100, "USD"))).toBeInTheDocument();
		expect(screen.getByText(formatCurrency(5000, "CLP"))).toBeInTheDocument();
		expect(screen.getByText(formatCurrency(0.5, "BTC"))).toBeInTheDocument();
	});

	it("shows a skeleton when loading is true", () => {
		vi.mocked(useBalancesQuery).mockReturnValue({
			data: undefined,
			isLoading: true,
		} as unknown as ReturnType<typeof useBalancesQuery>);
		renderWithProviders(<UserBalance />);
		expect(screen.getByTestId("user-balance-skeleton")).toBeInTheDocument();
	});
});
