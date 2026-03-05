import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignInPage } from "../features/auth/views/SignInPage";
import { SignUpPage } from "../features/auth/views/SignUpPage";
import { DashboardPage } from "../features/Dashboard/DashboardPage";
import { ExchangePage } from "../features/Exchange/ExchangePage";
import { TransactionsPage } from "../features/Transactions/TransactionsPage";
import { PrivateRoute } from "./PrivateRoute";

const router = createBrowserRouter([
	{ path: "/signin", element: <SignInPage /> },
	{ path: "/signup", element: <SignUpPage /> },
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
