import { useCallback, useState } from "react";
import styles from "./GroupButton.module.css";

export interface GroupButtonOption {
	value: string;
	label: string;
}

export interface GroupButtonProps {
	options: GroupButtonOption[];
	value?: string | null;
	onChange?: (value: string | null) => void;
	className?: string;
}

export function GroupButton({
	options,
	value: controlledValue,
	onChange,
	className,
}: GroupButtonProps) {
	const [internalValue, setInternalValue] = useState<string | null>(null);
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : internalValue;

	const handleClick = useCallback(
		(optionValue: string) => {
			const next = value === optionValue ? null : optionValue;
			if (!isControlled) setInternalValue(next);
			onChange?.(next);
		},
		[value, isControlled, onChange]
	);

	return (
		<div className={`${styles.group} ${className ?? ""}`.trim()}>
			{options.map((opt) => (
				<button
					key={opt.value}
					type="button"
					className={`${styles.option} ${value === opt.value ? styles.selected : ""}`.trim()}
					onClick={() => handleClick(opt.value)}
				>
					{opt.label}
				</button>
			))}
		</div>
	);
}
