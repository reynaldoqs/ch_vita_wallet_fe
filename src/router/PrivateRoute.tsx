import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store";

export function PrivateRoute() {
	const isAuthenticated = useAppSelector((state) => Boolean(state.auth.token));
	return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}
