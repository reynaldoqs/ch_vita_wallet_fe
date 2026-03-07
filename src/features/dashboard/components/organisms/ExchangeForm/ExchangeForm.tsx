import { Activity, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sileo } from "sileo";
import {
	Button,
	CurrencyAmountInput,
	Icon,
	Modal,
	Typography,
} from "@/components/atoms";
import { useExchangeRatesSync } from "@/hooks";
import { useExchangeMutation } from "@/services/walletService";
import type { ExchangeRequestBody, ExchangeResponse } from "@/types";
import { CURRENCIES } from "@/utils";
import { formatCurrency } from "@/utils/currency";
import { getErrorMessage } from "@/utils/error";
import { ExchangeSummaryCard } from "../../molecules";
import styles from "./ExchangeForm.module.css";

const PHASES = ["exchange", "confirm"] as const;

export function ExchangeForm() {
	const navigate = useNavigate();
	const [exchange, { isLoading: isExchanging }] = useExchangeMutation();
	const {
		fromCurrency,
		setFromCurrency,
		toCurrency,
		setToCurrency,
		fromAmount,
		setFromAmount,
		toAmount,
		setToAmount,
		toOptions,
		availableBalance,
		rate,
		formattedValidUntil,
	} = useExchangeRatesSync();
	const [currentPhase, setCurrentPhase] =
		useState<(typeof PHASES)[number]>("exchange");
	const [showModal, setShowModal] = useState<boolean>(false);

	const canContinue = fromAmount > 0 && fromAmount <= availableBalance;

	const handleBack = () => navigate(-1);

	const handleContinue = () => {
		if (currentPhase === "exchange") {
			setCurrentPhase("confirm");
		} else {
			const requestBody: ExchangeRequestBody = {
				from_currency: fromCurrency,
				to_currency: toCurrency,
				from_amount: fromAmount,
			};
			sileo.promise(exchange(requestBody).unwrap(), {
				success: (response: ExchangeResponse) => {
					console.log("response", response);
					setShowModal(true);
					return {
						title: "Transacción exitosa",
						description: "Tu transacción ha sido completada correctamente",
					};
				},
				loading: {
					title: "Intercambiando",
					description: "Espera un momento mientras completamos tu transacción",
				},
				// biome-ignore lint/suspicious/noExplicitAny: There is no easy way to type the error
				error: (error: any) => {
					return {
						title: "Error al intercambiar",
						description: getErrorMessage(error),
					};
				},
			});
		}
	};

	return (
		<>
			<Activity
				key="exchange"
				mode={currentPhase === "exchange" ? "visible" : "hidden"}
			>
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
						currencies={CURRENCIES}
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
						currencies={toOptions}
						placeholder="0,00"
						prefix=""
					/>
					{!canContinue && fromAmount > 0 ? (
						<Typography variant="caption2" as="span" className={styles.error}>
							No tienes suficiente saldo disponible
						</Typography>
					) : null}
				</form>
			</Activity>
			<Activity
				key="confirm"
				mode={currentPhase === "confirm" ? "visible" : "hidden"}
			>
				<div className={styles.summaryHeader}>
					<button type="button" onClick={() => setCurrentPhase("exchange")}>
						<Icon name="arrowLeft" />
					</button>
					<Typography variant="subtitle1" as="h1" className={styles.title}>
						Resumen de transacción
					</Typography>
				</div>
				<ExchangeSummaryCard
					sourceAmount={formatCurrency(fromAmount, fromCurrency)}
					exchangeRate={`1 ${fromCurrency} = ${rate} ${toCurrency}`}
					receivedAmount={formatCurrency(toAmount, toCurrency)}
				/>
			</Activity>
			<div className={styles.actions}>
				<Button type="button" variant="secondary" onClick={handleBack}>
					Atrás
				</Button>
				<Button
					type="submit"
					variant="primary"
					disabled={!canContinue || isExchanging}
					onClick={handleContinue}
				>
					Continuar
				</Button>
			</div>
			<Modal open={showModal} onClose={() => setShowModal(false)}>
				<Typography variant="subtitle1" as="h2" className={styles.modalTitle}>
					Transacción exitosa
				</Typography>
				<Typography variant="body" className={styles.modalDescription}>
					Tu transacción ha sido completada correctamente
				</Typography>
			</Modal>
		</>
	);
}
