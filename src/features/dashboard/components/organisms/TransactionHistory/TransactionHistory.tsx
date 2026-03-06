import { Skeleton } from "@/components";
import { Typography } from "@/components/atoms";
import { useTransactionsQuery } from "@/services";
import { TransactionRow } from "../../molecules";
import styles from "./TransactionHistory.module.css";

export function TransactionHistory() {
	const { data, isLoading } = useTransactionsQuery();
	const transactions = data?.transactions ?? [];

	return (
		<Skeleton loading={isLoading}>
			<section className={styles.container}>
				<Typography variant="subtitle2" as="h2">
					Historial
				</Typography>
				<ul className={styles.list} aria-label="Historial de transacciones">
					{transactions.length === 0 && !isLoading ? (
						<li>
							<Typography variant="body" as="p" className={styles.empty}>
								No hay transacciones
							</Typography>
						</li>
					) : (
						transactions.map((tx) => (
							<li key={tx.id}>
								<TransactionRow transaction={tx} />
							</li>
						))
					)}
				</ul>
			</section>
		</Skeleton>
	);
}
