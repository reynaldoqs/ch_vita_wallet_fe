import coin from "@/assets/images/coin.svg";
import { Typography } from "@/components/atoms";
import { BalanceCard } from "../../molecules";
import styles from "./UserBalance.module.css";
export function UserBalance() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				<img src={coin} alt="User" />
				<Typography variant="subtitle1">¡Hola</Typography>
				<Typography variant="subtitle1">David!</Typography>
			</h1>
			<Typography variant="subtitle2" as="p" className={styles.description}>
				Mis saldos
			</Typography>
			<div className={styles.balanceCards}>
				<BalanceCard currency="CLP" amount={1000900} />
				<BalanceCard currency="USD" amount={1000} />
				<BalanceCard currency="BTC" amount={0.0001} />
			</div>
		</div>
	);
}
