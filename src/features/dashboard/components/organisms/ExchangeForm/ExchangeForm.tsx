import { useNavigate } from "react-router-dom";
import { Button, CurrencyAmountInput, Typography } from "@/components/atoms";
import { useExchangeRatesSync } from "@/hooks";
import { formatCurrency } from "@/utils/currency";
import styles from "./ExchangeForm.module.css";

export function ExchangeForm() {
	const navigate = useNavigate();
	const {
		fromCurrency,
		setFromCurrency,
		toCurrency,
		setToCurrency,
		fromAmount,
		setFromAmount,
		toAmount,
		setToAmount,
		availableBalance,
		rate,
		formattedValidUntil,
	} = useExchangeRatesSync();

	const canContinue = fromAmount > 0 && fromAmount <= availableBalance;

	const handleBack = () => navigate(-1);

	return (
		<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
			<Typography variant="subtitle1" as="h1" className={styles.title}>
				¿Qué deseas intercambiar?
			</Typography>

			<Typography variant="body" className={styles.balance}>
				Saldo disponible: {formatCurrency(availableBalance, fromCurrency)}{" "}
				{fromCurrency}
			</Typography>

			<CurrencyAmountInput
				label="Monto a intercambiar"
				currency={fromCurrency}
				onCurrencyChange={setFromCurrency}
				amount={fromAmount}
				onAmountChange={setFromAmount}
				placeholder="0,00"
				prefix=""
			/>

			<div className={styles.rate}>
				<Typography variant="caption2" as="span">
					Tasa: 1 {fromCurrency} = {rate} {toCurrency}
				</Typography>
				<Typography variant="caption2" as="span">
					Valido hasta {formattedValidUntil}
				</Typography>
			</div>
			<CurrencyAmountInput
				label="Voy a recibir"
				currency={toCurrency}
				onCurrencyChange={setToCurrency}
				amount={toAmount}
				onAmountChange={setToAmount}
				placeholder="0,00"
				prefix=""
			/>
			{!canContinue && fromAmount > 0 ? (
				<Typography variant="caption2" as="span" className={styles.error}>
					No tienes suficiente saldo disponible
				</Typography>
			) : null}

			<div className={styles.actions}>
				<Button type="button" variant="secondary" onClick={handleBack}>
					Atrás
				</Button>
				<Button type="submit" variant="primary" disabled={!canContinue}>
					Continuar
				</Button>
			</div>
		</form>
	);
}
