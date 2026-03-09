import { Icon, type IconName } from "@/components";
import type { AssetPrices } from "@/types";
import { formatCurrency } from "@/utils";
import { CURRENCY_SYMBOLS } from "@/utils/constants";
import styles from "./PriceRows.module.css";

export interface PriceRowsProps {
	asset: string;
	prices: AssetPrices;
}

function AssetBadge({ asset }: { asset: string }) {
	return (
		<div className={styles.pairBadge}>
			<Icon name={asset as IconName} size={28} />
			<div>
				<p>{CURRENCY_SYMBOLS[asset] ?? asset}</p>
				<span>({asset})</span>
			</div>
		</div>
	);
}

function PriceBadge({
	children,
}: {
	children: React.ReactNode | React.ReactNode[];
}) {
	return <div className={styles.priceBadge}>{children}</div>;
}

export function PriceRows({ asset, prices }: PriceRowsProps) {
	const entries = Object.entries(prices);
	if (entries.length === 0) return null;
	return (
		<>
			{entries.map(([quote, { buy, sell }]) => (
				<div className={styles.row} key={`${asset}-${quote}`}>
					<AssetBadge asset={asset} />
					<PriceBadge>
						<p>{CURRENCY_SYMBOLS[quote] ?? quote}</p>
						<span>({quote})</span>
					</PriceBadge>
					<PriceBadge>
						<p>{formatCurrency(Number(buy), quote, 2)}</p>
					</PriceBadge>
					<PriceBadge>
						<p>{formatCurrency(Number(sell), quote, 2)}</p>
					</PriceBadge>
				</div>
			))}
		</>
	);
}
