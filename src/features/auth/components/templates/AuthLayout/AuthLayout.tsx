import type { ReactNode } from "react";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
	children: ReactNode;
	aside: ReactNode;
}
export function AuthLayout({ children, aside }: AuthLayoutProps) {
	return (
		<div className={styles.layout}>
			<aside className={styles.aside}>{aside}</aside>
			<main className={styles.main}>{children}</main>
		</div>
	);
}
