import { Typography } from "@/components/atoms";
import styles from "./ExchangeSummaryCard.module.css";

export interface ExchangeSummaryCardProps {
	sourceAmount: string;
	exchangeRate: string;
	receivedAmount: string;
}

export function ExchangeSummaryCard({
	sourceAmount,
	exchangeRate,
	receivedAmount,
}: ExchangeSummaryCardProps) {
	return (
		<article className={styles.card}>
			<div className={styles.row}>
				<Typography variant="caption1" as="span">
					Monto a intercambiar
				</Typography>
				<Typography variant="body" as="span" className={styles.value}>
					{sourceAmount}
				</Typography>
			</div>
			<div className={styles.row}>
				<Typography variant="caption1" as="span">
					Tasa de cambio
				</Typography>
				<Typography variant="body" as="span" className={styles.value}>
					{exchangeRate}
				</Typography>
			</div>
			<div className={styles.row}>
				<Typography variant="caption1" as="span">
					Total a recibir
				</Typography>
				<Typography variant="body" as="span" className={styles.received}>
					{receivedAmount}
				</Typography>
			</div>
		</article>
	);
}
