import { Skeleton } from "@/components";
import { Typography } from "@/components/atoms";
import { useCurrencyRatesQuery } from "@/services";
import type { AssetPrices } from "@/types";
import styles from "./PricesList.module.css";

const ASSET_LABELS: Record<string, string> = {
	btc: "BTC",
	usdc: "USDC",
	usdt: "USDT",
};

function formatPrice(value: string, maxDecimals = 5): string {
	const n = Number(value);
	if (!Number.isFinite(n)) return value;
	const fixed = n.toFixed(maxDecimals);
	return fixed.replace(/\.?0+$/, "") || "0";
}

function PriceRows({ asset, prices }: { asset: string; prices: AssetPrices }) {
	const entries = Object.entries(prices);
	if (entries.length === 0) return null;
	return (
		<>
			{entries.map(([quote, { buy, sell }]) => (
				<div key={`${asset}-${quote}`} className={styles.row}>
					<Typography variant="body" as="span" className={styles.pair}>
						{ASSET_LABELS[asset] ?? asset} / {quote.toUpperCase()}
					</Typography>
					<Typography variant="body" as="span" className={styles.buy}>
						{formatPrice(buy)}
					</Typography>
					<Typography variant="body" as="span" className={styles.sell}>
						{formatPrice(sell)}
					</Typography>
				</div>
			))}
		</>
	);
}

export function PricesList() {
	const { data, isLoading } = useCurrencyRatesQuery();
	const prices = data?.prices;
	const validUntil = data?.valid_until;

	return (
		<Skeleton loading={isLoading}>
			<section className={styles.container}>
				<Typography variant="subtitle2" as="h2">
					Precios
				</Typography>
				{validUntil && (
					<Typography variant="caption2" as="p" className={styles.validUntil}>
						Válidos hasta: {new Date(validUntil).toLocaleString()}
					</Typography>
				)}
				{!prices && !isLoading ? (
					<Typography variant="body" as="p" className={styles.empty}>
						No hay datos de precios
					</Typography>
				) : (
					<div className={styles.list}>
						<div className={styles.header}>
							<Typography variant="caption1" as="span">
								Par
							</Typography>
							<Typography variant="caption1" as="span">
								Compra
							</Typography>
							<Typography variant="caption1" as="span">
								Venta
							</Typography>
						</div>
						{(Object.entries(prices ?? {}) as [string, AssetPrices][]).map(
							([asset, assetPrices]) => (
								<PriceRows key={asset} asset={asset} prices={assetPrices} />
							),
						)}
					</div>
				)}
			</section>
		</Skeleton>
	);
}
