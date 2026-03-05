import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

export function AuthLayout({ children }: { children?: ReactNode }) {
	return (
		<div className={styles.layout}>
			<main className={styles.main}>{children ?? <Outlet />}</main>
		</div>
	);
}
