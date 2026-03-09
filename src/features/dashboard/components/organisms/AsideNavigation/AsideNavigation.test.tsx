import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen } from "@/tests/test-utils";
import { AsideNavigation } from "./AsideNavigation";

function renderAsideNav(initialEntries: string[] = ["/"]) {
	return renderWithProviders(
		<MemoryRouter initialEntries={initialEntries}>
			<AsideNavigation />
		</MemoryRouter>,
	);
}

describe("AsideNavigation", () => {
	it("renders main nav links", () => {
		renderAsideNav();
		expect(screen.getByText("Inicio")).toBeInTheDocument();
		expect(screen.getByText("Transferir")).toBeInTheDocument();
		expect(screen.getByText("Precios")).toBeInTheDocument();
		expect(screen.getByText("Intercambiar")).toBeInTheDocument();
		expect(screen.getByText("Perfil")).toBeInTheDocument();
		expect(screen.getByText("Ayuda")).toBeInTheDocument();
	});

	it("renders logout button", () => {
		renderAsideNav();
		expect(
			screen.getByRole("button", { name: "Cerrar sesión" }),
		).toBeInTheDocument();
	});

	it("Inicio link points to /", () => {
		renderAsideNav();
		const link = screen.getByRole("link", { name: "Inicio" });
		expect(link).toHaveAttribute("href", "/");
	});

	it("Precios link points to /precios", () => {
		renderAsideNav();
		const link = screen.getByRole("link", { name: "Precios" });
		expect(link).toHaveAttribute("href", "/precios");
	});

	it("Intercambiar link points to /intercambiar", () => {
		renderAsideNav();
		const link = screen.getByRole("link", { name: "Intercambiar" });
		expect(link).toHaveAttribute("href", "/intercambiar");
	});
});
