import { type CurrencyIconName, Icon, Typography } from "@/components/atoms";
import { CURRENCY_LABELS, formatCurrency } from "@/utils";
import styles from "./BalanceCard.module.css";

export interface BalanceCardProps {
	currency: CurrencyIconName;
	amount: number;
}

export function BalanceCard({ currency, amount }: BalanceCardProps) {
	const currencyLabel = CURRENCY_LABELS[currency] || currency;
	const formattedAmount = formatCurrency(amount, currency);
	return (
		<article className={styles.card}>
			<div className={styles.header}>
				<Typography variant="body" as="span">
					{currencyLabel}
				</Typography>
				<Icon name={currency} size={24} />
			</div>
			<Typography variant="subtitle2" as="p" className={styles.amount}>
				{formattedAmount}
			</Typography>
		</article>
	);
}
