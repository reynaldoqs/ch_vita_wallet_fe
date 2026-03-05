import type { ButtonHTMLAttributes } from "react";
import { Typography } from "../Typography/Typography";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	expanded?: boolean;
}

export function Button({
	variant = "primary",
	expanded = false,
	className,
	disabled,
	children,
	...props
}: ButtonProps) {
	const variantClass =
		variant === "primary" ? styles.variantPrimary : styles.variantSecondary;
	const widthClass = expanded ? styles.expanded : styles.fitContent;

	return (
		<button
			className={`${styles.button} ${variantClass} ${widthClass} ${className ?? ""}`.trim()}
			disabled={disabled}
			{...props}
		>
			<Typography variant="button">{children}</Typography>
		</button>
	);
}
