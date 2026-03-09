import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FormField } from "./FormField";

describe("FormField", () => {
	it("renders a label and input", () => {
		render(<FormField label="Email" />);
		expect(screen.getByText("Email")).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("associates label with input via htmlFor", () => {
		render(<FormField label="Email" id="email" />);
		const label = screen.getByText("Email");
		expect(label).toHaveAttribute("for", "email");
		expect(screen.getByRole("textbox")).toHaveAttribute("id", "email");
	});

	it("passes input props through", () => {
		render(<FormField label="Name" placeholder="Enter name" type="text" />);
		expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
	});

	it("renders password type input", () => {
		render(<FormField label="Password" type="password" />);
		expect(
			screen.getByRole("button", { name: "Mostrar contraseña" }),
		).toBeInTheDocument();
	});

	it("accepts user input", async () => {
		render(<FormField label="Username" />);
		const input = screen.getByRole("textbox") as HTMLInputElement;
		await userEvent.type(input, "john");
		expect(input.value).toBe("john");
	});
});
