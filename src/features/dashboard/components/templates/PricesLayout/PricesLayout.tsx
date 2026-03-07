import type { ReactNode } from "react";
import styles from "./PricesLayout.module.css";

interface PricesLayoutProps {
	children: ReactNode;
}

export function PricesLayout({ children }: PricesLayoutProps) {
	return (
		<div className={styles.layout}>
			<main className={styles.container}>{children}</main>
		</div>
	);
}
