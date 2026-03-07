import { useId } from "react";
import { CURRENCIES } from "@/utils/constants";
import { Icon } from "../Icon/Icon";
import type { CurrencyIconName } from "../Icon/iconAssets";
import styles from "./CurrencyAmountInput.module.css";

function formatDisplayValue(value: number): string {
	if (value === 0) return "";
	return String(value);
}

function parseInputValue(s: string): number {
	const normalized = s.trim().replace(/,/g, ".");
	if (normalized === "" || normalized === ".") return 0;
	const n = Number(normalized);
	return Number.isNaN(n) ? 0 : n;
}

type CurrencyAmountInputProps = {
	label?: string;
	currency: (typeof CURRENCIES)[number];
	onCurrencyChange: (currency: (typeof CURRENCIES)[number]) => void;
	amount: number;
	onAmountChange: (amount: number) => void;
	placeholder?: string;
	prefix?: string;
	id?: string;
	readOnly?: boolean;
};

export function CurrencyAmountInput({
	label = "Monto a intercambiar",
	currency,
	onCurrencyChange,
	amount,
	onAmountChange,
	placeholder = "0,00",
	prefix = "$",
	id: idProp,
	readOnly = false,
}: CurrencyAmountInputProps) {
	const generatedId = useId();
	const id = idProp ?? generatedId;
	const displayValue = amount === 0 ? "" : formatDisplayValue(amount);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;
		if (raw === "") {
			onAmountChange(0);
			return;
		}
		onAmountChange(parseInputValue(raw));
	};

	return (
		<div className={styles.wrapper}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
			)}
			<div className={styles.combo}>
				<div className={styles.selectWrap}>
					<Icon
						name={currency as CurrencyIconName}
						size={20}
						className={styles.flag}
					/>
					<svg
						className={styles.chevron}
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						aria-hidden
					>
						<title>Desplegar</title>
						<path d="M6 9l6 6 6-6" />
					</svg>
					<select
						aria-label="Moneda"
						value={currency}
						onChange={(e) =>
							onCurrencyChange(e.target.value as (typeof CURRENCIES)[number])
						}
						className={styles.select}
					>
						{CURRENCIES.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</div>
				<div className={styles.inputWrap}>
					{prefix ? <span className={styles.prefix}>{prefix}</span> : null}
					<input
						id={id}
						type="text"
						inputMode="decimal"
						className={styles.input}
						value={displayValue}
						onChange={handleInputChange}
						placeholder={placeholder}
						aria-label={label}
						readOnly={readOnly}
					/>
				</div>
			</div>
		</div>
	);
}
