import { Outlet } from "react-router-dom";
import { AsideNavigation } from "../../organisms";
import styles from "./DashboardLayout.module.css";

export function DashboardLayout() {
	return (
		<div className={styles.layout}>
			<AsideNavigation />
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	);
}
