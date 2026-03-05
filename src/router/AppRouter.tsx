import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardPage } from "../features/Dashboard/DashboardPage";
import { ExchangePage } from "../features/Exchange/ExchangePage";
import { LoginPage } from "../features/Login/views/LoginPage";
import { TransactionsPage } from "../features/Transactions/TransactionsPage";
import { PrivateRoute } from "./PrivateRoute";

const router = createBrowserRouter([
	{ path: "/login", element: <LoginPage /> },
	{
		element: <PrivateRoute />,
		children: [
			{ path: "/", element: <DashboardPage /> },
			{ path: "/exchange", element: <ExchangePage /> },
			{ path: "/transactions", element: <TransactionsPage /> },
		],
	},
]);

export function AppRouter() {
	return <RouterProvider router={router} />;
}
