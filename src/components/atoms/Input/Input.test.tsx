import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
	it("renders a text input by default", () => {
		render(<Input />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("renders with a given placeholder", () => {
		render(<Input placeholder="Enter text" />);
		expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
	});

	it("renders password input with toggle button", () => {
		render(<Input type="password" />);
		expect(
			screen.getByRole("button", { name: "Mostrar contraseña" }),
		).toBeInTheDocument();
	});

	it("toggles password visibility when toggle is clicked", async () => {
		render(<Input type="password" />);
		const input = document.querySelector("input") as HTMLInputElement;
		const toggle = screen.getByRole("button", { name: "Mostrar contraseña" });

		expect(input.type).toBe("password");
		await userEvent.click(toggle);
		expect(input.type).toBe("text");
		expect(
			screen.getByRole("button", { name: "Ocultar contraseña" }),
		).toBeInTheDocument();
	});

	it("accepts user input", async () => {
		render(<Input />);
		const input = screen.getByRole("textbox") as HTMLInputElement;
		await userEvent.type(input, "hello");
		expect(input.value).toBe("hello");
	});
});
