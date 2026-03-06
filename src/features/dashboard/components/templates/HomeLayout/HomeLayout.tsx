import type { ReactNode } from "react";
import styles from "./HomeLayout.module.css";

interface HomeLayoutProps {
	header: ReactNode;
	children: ReactNode;
}
export function HomeLayout({ header, children }: HomeLayoutProps) {
	return (
		<div className={styles.layout}>
			<div className={styles.container}>
				<header>{header}</header>
				<main>{children}</main>
			</div>
		</div>
	);
}
