import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GroupButton } from "./GroupButton";

const options = [
	{ value: "day", label: "Day" },
	{ value: "week", label: "Week" },
	{ value: "month", label: "Month" },
];

describe("GroupButton", () => {
	it("renders all options", () => {
		render(<GroupButton options={options} />);
		expect(screen.getByRole("button", { name: "Day" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Week" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Month" })).toBeInTheDocument();
	});

	it("selects an option on click (uncontrolled)", async () => {
		render(<GroupButton options={options} />);
		const btn = screen.getByRole("button", { name: "Week" });
		await userEvent.click(btn);
		expect(btn.className).toContain("selected");
	});

	it("deselects the same option on second click (uncontrolled)", async () => {
		render(<GroupButton options={options} />);
		const btn = screen.getByRole("button", { name: "Day" });
		await userEvent.click(btn);
		expect(btn.className).toContain("selected");
		await userEvent.click(btn);
		expect(btn.className).not.toContain("selected");
	});

	it("calls onChange with selected value", async () => {
		const onChange = vi.fn();
		render(<GroupButton options={options} onChange={onChange} />);
		await userEvent.click(screen.getByRole("button", { name: "Month" }));
		expect(onChange).toHaveBeenCalledWith("month");
	});

	it("calls onChange with null when deselecting", async () => {
		const onChange = vi.fn();
		render(<GroupButton options={options} value="day" onChange={onChange} />);
		await userEvent.click(screen.getByRole("button", { name: "Day" }));
		expect(onChange).toHaveBeenCalledWith(null);
	});

	it("reflects controlled value", () => {
		render(<GroupButton options={options} value="week" />);
		expect(screen.getByRole("button", { name: "Week" }).className).toContain(
			"selected",
		);
		expect(screen.getByRole("button", { name: "Day" }).className).not.toContain(
			"selected",
		);
	});
});
