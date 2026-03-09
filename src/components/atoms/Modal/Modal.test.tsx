import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
	it("renders children when open", () => {
		render(
			<Modal open onClose={() => {}}>
				<p>Modal content</p>
			</Modal>,
		);
		expect(screen.getByText("Modal content")).toBeInTheDocument();
	});

	it("does not render when closed", () => {
		render(
			<Modal open={false} onClose={() => {}}>
				<p>Hidden content</p>
			</Modal>,
		);
		expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
	});

	it("calls onClose when backdrop button is clicked", async () => {
		const onClose = vi.fn();
		render(
			<Modal open onClose={onClose}>
				<p>Content</p>
			</Modal>,
		);
		await userEvent.click(screen.getByRole("button", { name: "Close modal" }));
		expect(onClose).toHaveBeenCalledOnce();
	});

	it("calls onClose when Escape key is pressed", async () => {
		const onClose = vi.fn();
		render(
			<Modal open onClose={onClose}>
				<p>Content</p>
			</Modal>,
		);
		await userEvent.keyboard("{Escape}");
		expect(onClose).toHaveBeenCalledOnce();
	});

	it("does not propagate clicks from dialog content to backdrop", async () => {
		const onClose = vi.fn();
		render(
			<Modal open onClose={onClose}>
				<p>Inner</p>
			</Modal>,
		);
		await userEvent.click(screen.getByRole("dialog"));
		expect(onClose).not.toHaveBeenCalled();
	});
});
