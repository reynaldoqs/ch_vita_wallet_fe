import { Skeleton } from "@/components";
import { Typography } from "@/components/atoms";
import { useCurrencyRatesQuery } from "@/services";
import type { AssetPrices } from "@/types";
import { PriceRows, PricesListEmpty } from "../../molecules";
import styles from "./PricesList.module.css";

export function PricesList() {
	const { data, isLoading } = useCurrencyRatesQuery();
	const prices = data?.prices;
	const validUntil = data?.valid_until;

	return (
		<Skeleton loading={isLoading}>
			<section className={styles.container}>
				<div className={styles.titleContainer}>
					<Typography variant="title" className={styles.title}>
						Precios
					</Typography>
					{validUntil && (
						<Typography variant="caption2" as="p" className={styles.validUntil}>
							Válidos hasta: {new Date(validUntil).toLocaleString()}
						</Typography>
					)}
				</div>
				{!prices && !isLoading ? (
					<PricesListEmpty />
				) : (
					<div className={styles.list}>
						<div className={styles.header}>
							<Typography variant="caption2" as="span">
								Activo
							</Typography>
							<Typography variant="caption2" as="span">
								Cotización
							</Typography>
							<Typography variant="caption2" as="span">
								Compra
							</Typography>
							<Typography variant="caption2" as="span">
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
