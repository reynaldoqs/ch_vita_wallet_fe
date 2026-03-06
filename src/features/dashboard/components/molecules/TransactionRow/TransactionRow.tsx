import { Typography } from "@/components/atoms";
import type { Transaction } from "@/types/wallet.types";
import { formatCurrency } from "@/utils";
import styles from "./TransactionRow.module.css";

export interface TransactionRowProps {
	transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
	const {
		from_currency,
		to_currency,
		from_amount,
		to_amount,
		exchange_rate,
		status,
		created_at,
	} = transaction;
	const fromFormatted = formatCurrency(Number(from_amount), from_currency);
	const toFormatted = formatCurrency(Number(to_amount), to_currency);
	const dateNative = new Date(created_at).toLocaleString();

	return (
		<article className={styles.row}>
			<div className={styles.left}>
				<div className={styles.primary}>
					<Typography variant="body" as="span">
						Intercambiaste
					</Typography>
				</div>
				<div className={styles.meta}>
					<Typography variant="caption2" as="span">
						{dateNative}
					</Typography>
					<span className={styles.dot} aria-hidden />
					<Typography
						variant="caption2"
						as="span"
						className={
							status === "completed"
								? styles.completed
								: status === "pending"
									? styles.pending
									: status === "rejected"
										? styles.failed
										: undefined
						}
					>
						{status}
					</Typography>
					<span className={styles.dot} aria-hidden />
					<Typography variant="caption2" as="span">
						Tasa {exchange_rate}
					</Typography>
				</div>
			</div>
			<div className={styles.right}>
				<Typography variant="body" as="span" className={styles.flow}>
					<span className={styles.remove}>
						- {fromFormatted} {from_currency}
					</span>{" "}
					→{" "}
					<span className={styles.add}>
						+ {toFormatted} {to_currency}
					</span>
				</Typography>
			</div>
		</article>
	);
}
