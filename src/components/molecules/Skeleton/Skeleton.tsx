import { Shimmer } from "shimmer-from-structure";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	loading: boolean;
	children: React.ReactNode;
}

export function Skeleton({ loading, children, ...rest }: SkeletonProps) {
	return (
		<div {...rest}>
			<Shimmer
				loading={loading}
				shimmerColor="#b9c1c2"
				backgroundColor="#dee0e0"
				duration={1}
				fallbackBorderRadius={12}
			>
				{children}
			</Shimmer>
		</div>
	);
}
