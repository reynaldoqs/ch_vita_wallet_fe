import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ExchangePage, PricesPage } from "@/features/dashboard";
import { DashboardLayout } from "@/features/dashboard/components";
import { HomePage } from "@/features/dashboard/views/HomePage";
import { SignInPage } from "../features/auth/views/SignInPage";
import { SignUpPage } from "../features/auth/views/SignUpPage";
import { PrivateRoute } from "./PrivateRoute";

const router = createBrowserRouter([
	{ path: "/signin", element: <SignInPage /> },
	{ path: "/signup", element: <SignUpPage /> },
	{
		element: <PrivateRoute />,
		children: [
			{
				path: "/",
				element: <DashboardLayout />,
				children: [
					{ index: true, element: <HomePage /> },
					{ path: "precios", element: <PricesPage /> },
					{ path: "intercambiar", element: <ExchangePage /> },
				],
			},
		],
	},
]);

export function AppRouter() {
	return <RouterProvider router={router} />;
}
