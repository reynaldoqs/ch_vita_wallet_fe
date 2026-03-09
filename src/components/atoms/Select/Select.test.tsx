import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

describe("Select", () => {
	it("renders a select element", () => {
		render(
			<Select>
				<option value="a">Option A</option>
			</Select>,
		);
		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});

	it("renders provided options", () => {
		render(
			<Select>
				<option value="usd">USD</option>
				<option value="clp">CLP</option>
			</Select>,
		);
		expect(screen.getByRole("option", { name: "USD" })).toBeInTheDocument();
		expect(screen.getByRole("option", { name: "CLP" })).toBeInTheDocument();
	});

	it("calls onChange when selection changes", async () => {
		const onChange = vi.fn();
		render(
			<Select onChange={onChange}>
				<option value="usd">USD</option>
				<option value="clp">CLP</option>
			</Select>,
		);
		await userEvent.selectOptions(screen.getByRole("combobox"), "clp");
		expect(onChange).toHaveBeenCalled();
	});
});
