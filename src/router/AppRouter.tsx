import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

const SignInPage = lazy(() => import("@/features/auth/views/SignInPage").then((m) => ({ default: m.SignInPage })));
const SignUpPage = lazy(() => import("@/features/auth/views/SignUpPage").then((m) => ({ default: m.SignUpPage })));
const DashboardLayout = lazy(() => import("@/features/dashboard/components/templates/DashboardLayout/DashboardLayout").then((m) => ({ default: m.DashboardLayout })));
const HomePage = lazy(() => import("@/features/dashboard/views/HomePage").then((m) => ({ default: m.HomePage })));
const PricesPage = lazy(() => import("@/features/dashboard/views/PricesPage").then((m) => ({ default: m.PricesPage })));
const ExchangePage = lazy(() => import("@/features/dashboard/views/ExchangePage").then((m) => ({ default: m.ExchangePage })));

const Page = ({ children }: { children: React.ReactNode }) => (
	<Suspense fallback={null}>{children}</Suspense>
);

const router = createBrowserRouter([
	{ path: "/signin", element: <Page><SignInPage /></Page> },
	{ path: "/signup", element: <Page><SignUpPage /></Page> },
	{
		element: <PrivateRoute />,
		children: [
			{
				path: "/",
				element: <Page><DashboardLayout /></Page>,
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
