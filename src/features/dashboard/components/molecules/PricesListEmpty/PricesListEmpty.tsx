import { Typography } from "@/components/atoms";
import styles from "./PricesListEmpty.module.css";

export function PricesListEmpty() {
	return (
		<Typography variant="body" as="p" className={styles.empty}>
			No hay datos de precios
		</Typography>
	);
}
