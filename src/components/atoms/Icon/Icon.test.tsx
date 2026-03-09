import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";

function getIconImg(container: HTMLElement) {
	return container.querySelector("img");
}

describe("Icon", () => {
	it("renders an img for a known icon name", () => {
		const { container } = render(<Icon name="check" />);
		const img = getIconImg(container);
		expect(img).toBeInTheDocument();
	});

	it("renders nothing for an unknown icon name", () => {
		// @ts-expect-error testing unknown name
		const { container } = render(<Icon name="nonexistent" />);
		expect(getIconImg(container)).toBeNull();
	});

	it("applies custom size", () => {
		const { container } = render(<Icon name="check" size={32} />);
		const img = getIconImg(container);
		expect(img).toHaveAttribute("width", "32");
		expect(img).toHaveAttribute("height", "32");
	});

	it("applies custom className", () => {
		const { container } = render(<Icon name="check" className="my-icon" />);
		const img = getIconImg(container);
		expect(img).toHaveClass("my-icon");
	});

	it("renders a currency icon", () => {
		const { container } = render(<Icon name="BTC" />);
		expect(getIconImg(container)).toBeInTheDocument();
	});
});
