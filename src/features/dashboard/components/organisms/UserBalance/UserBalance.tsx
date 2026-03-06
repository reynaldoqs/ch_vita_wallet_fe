import coin from "@/assets/images/coin.svg";
import { Skeleton } from "@/components";
import { Typography } from "@/components/atoms";
import { useBalancesQuery } from "@/services";
import { useAppSelector } from "@/store";
import { flattenBalance } from "@/utils";
import { BalanceCard } from "../../molecules";
import styles from "./UserBalance.module.css";

export function UserBalance() {
	const { data: balances, isLoading } = useBalancesQuery();
	const { user } = useAppSelector((state) => state.auth);
	const flattenedBalances = flattenBalance(balances);
	return (
		<Skeleton loading={isLoading}>
			<div className={styles.container}>
				<h1 className={styles.title}>
					<img src={coin} alt="User" />
					<Typography variant="subtitle1">¡Hola</Typography>
					<Typography variant="subtitle1">{user?.email}!</Typography>
				</h1>
				<Typography variant="subtitle2" as="p" className={styles.description}>
					Mis saldos
				</Typography>
				<div className={styles.balanceCards}>
					{flattenedBalances.map(({ currency, value }) => (
						<BalanceCard key={currency} currency={currency} amount={value} />
					))}
				</div>
			</div>
		</Skeleton>
	);
}
