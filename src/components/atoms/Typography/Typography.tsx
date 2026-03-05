import type { ElementType, ReactNode } from "react";
import styles from "./Typography.module.css";

type TypographyVariant =
	| "title"
	| "subtitle1"
	| "subtitle2"
	| "button"
	| "body"
	| "caption1"
	| "caption2";

interface TypographyProps {
	variant?: TypographyVariant;
	as?: ElementType;
	children: ReactNode;
	className?: string;
}

const variantClass: Record<TypographyVariant, string> = {
	title: styles.title,
	subtitle1: styles.subtitle1,
	subtitle2: styles.subtitle2,
	button: styles.button,
	body: styles.body,
	caption1: styles.caption1,
	caption2: styles.caption2,
};

export function Typography({
	variant = "body",
	as: Component = "span",
	children,
	className,
}: TypographyProps) {
	const classNames = [variantClass[variant], className]
		.filter(Boolean)
		.join(" ");

	return <Component className={classNames}>{children}</Component>;
}
