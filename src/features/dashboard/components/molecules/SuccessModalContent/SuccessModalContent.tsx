import successIllustration from "@/assets/images/success.svg";
import { Icon, Typography } from "@/components/atoms";
import styles from "./SuccessModalContent.module.css";

export interface SuccessModalContentProps {
	onClose: () => void;
	title?: string;
	receivedCurrency: string;
}

export function SuccessModalContent({
	onClose,
	title = "¡Intercambio exitoso!",
	receivedCurrency,
}: SuccessModalContentProps) {
	return (
		<>
			<button
				type="button"
				className={styles.close}
				onClick={onClose}
				aria-label="Cerrar"
			>
				<Icon name="x" size={24} />
			</button>
			<img src={successIllustration} alt="" className={styles.illustration} />
			<Typography variant="subtitle1" as="h2" className={styles.title}>
				{title}
			</Typography>
			<Typography variant="body" className={styles.description}>
				Ya cuentas con los {receivedCurrency} en tu saldo.
			</Typography>
		</>
	);
}
