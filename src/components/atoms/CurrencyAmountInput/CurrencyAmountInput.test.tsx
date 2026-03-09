import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CurrencyAmountInput } from "./CurrencyAmountInput";

const defaultProps = {
	currency: "USD" as const,
	onCurrencyChange: vi.fn(),
	amount: 0,
	onAmountChange: vi.fn(),
};

describe("CurrencyAmountInput", () => {
	it("renders label", () => {
		render(<CurrencyAmountInput {...defaultProps} label="Amount" />);
		expect(screen.getByText("Amount")).toBeInTheDocument();
	});

	it("renders currency selector with current currency", () => {
		render(<CurrencyAmountInput {...defaultProps} />);
		expect(screen.getByRole("combobox", { name: "Moneda" })).toHaveValue("USD");
	});

	it("calls onCurrencyChange when currency is changed", async () => {
		const onCurrencyChange = vi.fn();
		render(
			<CurrencyAmountInput
				{...defaultProps}
				onCurrencyChange={onCurrencyChange}
			/>,
		);
		await userEvent.selectOptions(
			screen.getByRole("combobox", { name: "Moneda" }),
			"CLP",
		);
		expect(onCurrencyChange).toHaveBeenCalledWith("CLP");
	});

	it("displays the amount value", () => {
		render(<CurrencyAmountInput {...defaultProps} amount={100} />);
		expect(
			(document.querySelector("input[type='text']") as HTMLInputElement).value,
		).toBe("100");
	});

	it("calls onAmountChange when user types", async () => {
		const onAmountChange = vi.fn();
		render(
			<CurrencyAmountInput {...defaultProps} onAmountChange={onAmountChange} />,
		);
		const input = document.querySelector(
			"input[type='text']",
		) as HTMLInputElement;
		await userEvent.type(input, "50");
		expect(onAmountChange).toHaveBeenCalled();
	});

	it("is read-only when readOnly is true", () => {
		render(<CurrencyAmountInput {...defaultProps} readOnly />);
		const input = document.querySelector(
			"input[type='text']",
		) as HTMLInputElement;
		expect(input).toHaveAttribute("readonly");
	});

	it("renders prefix symbol", () => {
		render(<CurrencyAmountInput {...defaultProps} prefix="$" />);
		expect(screen.getByText("$")).toBeInTheDocument();
	});
});
