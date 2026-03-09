import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Typography } from "./Typography";

describe("Typography", () => {
	it("renders children", () => {
		render(<Typography>Hello</Typography>);
		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("renders as a span by default", () => {
		render(<Typography>Text</Typography>);
		expect(screen.getByText("Text").tagName).toBe("SPAN");
	});

	it("renders as a custom element via 'as' prop", () => {
		render(<Typography as="h1">Title</Typography>);
		expect(
			screen.getByRole("heading", { level: 1, name: "Title" }),
		).toBeInTheDocument();
	});

	it("applies variant class", () => {
		render(<Typography variant="title">Big</Typography>);
		expect(screen.getByText("Big").className).toContain("title");
	});

	it("applies extra className", () => {
		render(<Typography className="custom">Text</Typography>);
		expect(screen.getByText("Text").className).toContain("custom");
	});
});
