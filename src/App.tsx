import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sileo";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store";

export default function App() {
	return (
		<ReduxProvider store={store}>
			<Toaster position="top-right" />
			<AppRouter />
		</ReduxProvider>
	);
}
