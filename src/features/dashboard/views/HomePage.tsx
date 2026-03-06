import { HomeLayout, UserBalance } from "../components";

export function HomePage() {
	return (
		<HomeLayout header={<UserBalance />}>
			<div>HomePage</div>
		</HomeLayout>
	);
}
