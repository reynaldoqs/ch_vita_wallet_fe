import {
	type CurrencyIconName,
	currencyIcons,
	type IconName,
	iconAssetPaths,
} from "./iconAssets";

export type { IconName } from "./iconAssets";

export interface IconProps {
	name: IconName | CurrencyIconName;
	size?: number;
	className?: string;
}

const defaultSize = 24;

export function Icon({ name, size = defaultSize, className }: IconProps) {
	const src =
		iconAssetPaths[name as IconName] || currencyIcons[name as CurrencyIconName];
	if (!src) return null;

	return (
		<img
			src={src}
			alt=""
			width={size}
			height={size}
			className={className}
			aria-hidden
		/>
	);
}
