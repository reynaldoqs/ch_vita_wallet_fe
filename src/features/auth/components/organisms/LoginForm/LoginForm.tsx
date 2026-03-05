import { Link, useNavigate } from "react-router-dom";
import { sileo } from "sileo";
import { Button, Input, Label, Typography } from "@/components/atoms";
import { useLoginMutation } from "@/services/authService";
import { getErrorMessage } from "@/utils";
import styles from "./LoginForm.module.css";

export function LoginForm() {
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();
	const submitForm = async (formData: FormData) => {
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		sileo.promise(login({ email, password }).unwrap(), {
			success: (data) => {
				console.log(data);
				navigate("/");
				return {
					title: "Login successful",
					description: "You have been logged in successfully",
				};
			},
			// biome-ignore lint/suspicious/noExplicitAny: There is no way to type the error
			error: (error: any) => {
				return {
					title: "Login failed",
					description: getErrorMessage(error),
				};
			},
			loading: {
				title: "Login in progress",
				description: "Please wait while we log you in",
			},
		});
	};
	return (
		<form className={styles.form} action={submitForm}>
			<Typography variant="title" as="h1" className={styles.title}>
				Iniciar sesión
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
			<div className={styles.forgotPassword}>
				<Label htmlFor="password">Password</Label>
				<Input
					type="password"
					name="password"
					placeholder="Escribe tu contraseña"
					required
					disabled={isLoading}
				/>
				<Typography variant="caption2">¿Olvidaste tu contraseña?</Typography>
			</div>
			<Button
				type="submit"
				variant="primary"
				expanded
				disabled={isLoading}
				className={styles.action}
			>
				Iniciar sesión
			</Button>
			<Typography variant="body" as="p" className={styles.footer}>
				¿No tienes cuenta? <Link to="/signup">Crear cuenta</Link>
			</Typography>
		</form>
	);
}
