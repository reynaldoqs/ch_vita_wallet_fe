import { Link, useNavigate } from "react-router-dom";
import { sileo } from "sileo";
import { Button, Input, Label, Typography } from "@/components/atoms";
import { useSignUpMutation } from "@/services/authService";
import { getErrorMessage } from "@/utils";
import styles from "./SignUpForm.module.css";

export function SignUpForm() {
	const [signUp, { isLoading }] = useSignUpMutation();
	const navigate = useNavigate();
	const submitForm = async (formData: FormData) => {
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const password_confirmation = formData.get(
			"password_confirmation",
		) as string;

		sileo.promise(signUp({ email, password, password_confirmation }).unwrap(), {
			success: () => {
				navigate("/");
				return {
					title: "Cuenta creada",
					description: "Tu cuenta ha sido creada correctamente",
				};
			},
			// biome-ignore lint/suspicious/noExplicitAny: There is no way to type the error
			error: (error: any) => {
				return {
					title: "Error al registrarse",
					description: getErrorMessage(error),
				};
			},
			loading: {
				title: "Creando cuenta",
				description: "Espera un momento",
			},
		});
	};
	return (
		<form className={styles.form} action={submitForm}>
			<Typography variant="title" as="h1" className={styles.title}>
				Crear cuenta
			</Typography>

			<div>
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					name="email"
					placeholder="juan@gmail.com"
					required
					disabled={isLoading}
				/>
			</div>
			<div>
				<Label htmlFor="password">Password</Label>
				<Input
					type="password"
					name="password"
					placeholder="Mínimo 8 caracteres"
					required
					minLength={8}
					disabled={isLoading}
				/>
			</div>
			<div>
				<Label htmlFor="password_confirmation">Confirmar password</Label>
				<Input
					type="password"
					name="password_confirmation"
					placeholder="Repite tu contraseña"
					required
					minLength={8}
					disabled={isLoading}
				/>
			</div>
			<Button
				type="submit"
				variant="primary"
				expanded
				disabled={isLoading}
				className={styles.action}
			>
				Crear cuenta
			</Button>
			<Typography variant="caption1">
				(DEV) Al crear tu cuenta recibirás $10,000 USD para testear la
				plataforma. 🚀💰
			</Typography>
			<Typography variant="body" as="p" className={styles.footer}>
				¿Ya tienes cuenta? <Link to="/signin">Iniciar sesión</Link>
			</Typography>
		</form>
	);
}
