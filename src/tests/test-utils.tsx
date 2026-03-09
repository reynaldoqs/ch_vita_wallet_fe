import {
	act,
	cleanup,
	fireEvent,
	type RenderOptions,
	render as rtlRender,
	screen,
	waitFor,
	within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export function renderWithProviders(
	ui: React.ReactElement,
	options: Omit<RenderOptions, "wrapper"> = {},
) {
	return rtlRender(ui, {
		wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
		...options,
	});
}

export { screen, waitFor, within, cleanup, fireEvent, act };
