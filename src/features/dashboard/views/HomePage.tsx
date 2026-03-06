import { HomeLayout, TransactionHistory, UserBalance } from "../components";

export function HomePage() {
	return (
		<HomeLayout header={<UserBalance />}>
			<TransactionHistory />
		</HomeLayout>
	);
}
