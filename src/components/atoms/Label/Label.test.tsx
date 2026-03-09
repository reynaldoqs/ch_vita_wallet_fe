import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "./Label";

describe("Label", () => {
	it("renders children", () => {
		render(<Label>My Label</Label>);
		expect(screen.getByText("My Label")).toBeInTheDocument();
	});

	it("renders a <label> element when htmlFor is provided", () => {
		render(<Label htmlFor="input-id">Email</Label>);
		const el = screen.getByText("Email");
		expect(el.tagName).toBe("LABEL");
		expect(el).toHaveAttribute("for", "input-id");
	});

	it("renders a <span> element when htmlFor is not provided", () => {
		render(<Label>Name</Label>);
		const el = screen.getByText("Name");
		expect(el.tagName).toBe("SPAN");
	});
});
