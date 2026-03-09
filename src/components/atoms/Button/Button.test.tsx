import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
	it("renders children", () => {
		render(<Button>Click me</Button>);
		expect(
			screen.getByRole("button", { name: "Click me" }),
		).toBeInTheDocument();
	});

	it("is disabled when disabled prop is true", () => {
		render(<Button disabled>Submit</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("calls onClick when clicked", async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Click</Button>);
		await userEvent.click(screen.getByRole("button"));
		expect(onClick).toHaveBeenCalledOnce();
	});

	it("does not call onClick when disabled", async () => {
		const onClick = vi.fn();
		render(
			<Button onClick={onClick} disabled>
				Click
			</Button>,
		);
		await userEvent.click(screen.getByRole("button"));
		expect(onClick).not.toHaveBeenCalled();
	});

	it("applies primary variant by default", () => {
		render(<Button>Primary</Button>);
		expect(screen.getByRole("button").className).toContain("variantPrimary");
	});

	it("applies secondary variant when specified", () => {
		render(<Button variant="secondary">Secondary</Button>);
		expect(screen.getByRole("button").className).toContain("variantSecondary");
	});

	it("applies expanded class when expanded is true", () => {
		render(<Button expanded>Wide</Button>);
		expect(screen.getByRole("button").className).toContain("expanded");
	});
});
