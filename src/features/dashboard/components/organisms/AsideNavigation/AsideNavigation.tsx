import { NavLink } from "react-router-dom";
import { Typography } from "@/components";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/auth/authSlice";
import styles from "./AsideNavigation.module.css";

export function AsideNavigation() {
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<nav className={styles.sidebar}>
			<NavLink
				to="/"
				className={({ isActive }) => (isActive ? styles.active : "")}
			>
				<Typography variant="subtitle2">Inicio</Typography>
			</NavLink>
			<NavLink to="#">
				<Typography variant="subtitle2">Transferir</Typography>
			</NavLink>
			<NavLink to="#">
				<Typography variant="subtitle2">Recargar</Typography>
			</NavLink>

			<NavLink
				to="/intercambiar"
				className={({ isActive }) => (isActive ? styles.active : "")}
			>
				<Typography variant="subtitle2">Intercambiar</Typography>
			</NavLink>
			<NavLink to="#">
				<Typography variant="subtitle2">Perfil</Typography>
			</NavLink>
			<NavLink to="#">
				<Typography variant="subtitle2">Ayuda</Typography>
			</NavLink>
			<button type="button" onClick={handleLogout}>
				<Typography variant="subtitle2">Cerrar sesión</Typography>
			</button>
		</nav>
	);
}
