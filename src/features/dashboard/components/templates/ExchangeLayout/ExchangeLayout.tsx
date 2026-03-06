import type { ReactNode } from "react";
import styles from "./ExchangeLayout.module.css";

interface ExchangeLayoutProps {
	children: ReactNode;
}
export function ExchangeLayout({ children }: ExchangeLayoutProps) {
	return (
		<div className={styles.layout}>
			<main className={styles.container}>{children}</main>
		</div>
	);
}
