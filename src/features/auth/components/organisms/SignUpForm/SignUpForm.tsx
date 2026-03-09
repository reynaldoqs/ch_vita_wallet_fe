import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "react-router-dom";
import { sileo } from "sileo";
import { Button, Input, Label, Typography } from "@/components/atoms";
import { useSignUpMutation } from "@/services/authService";
import { type SignUpRequest, signUpRequestSchema } from "@/types/auth.types";
import { getErrorMessage } from "@/utils";
import styles from "./SignUpForm.module.css";

export function SignUpForm() {
	const [signUp, { isLoading }] = useSignUpMutation();
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			password_confirmation: "",
		},
		validators: {
			onChange: signUpRequestSchema,
		},
		onSubmit: async (data) => {
			await submitForm(data.value);
		},
	});

	const submitForm = async (formData: SignUpRequest) => {
		sileo.promise(signUp(formData).unwrap(), {
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
		<form
			className={styles.form}
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Typography variant="title" as="h1" className={styles.title}>
				Crear cuenta
			</Typography>

			<form.Field name="email">
				{(field) => (
					<div>
						<Label htmlFor={field.name}>Email</Label>
						<Input
							type="email"
							id={field.name}
							placeholder="juan@gmail.com"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							disabled={isLoading}
						/>
					</div>
				)}
			</form.Field>
			<form.Field name="password">
				{(field) => (
					<div>
						<Label htmlFor={field.name}>Password</Label>
						<Input
							type="password"
							id={field.name}
							placeholder="Mínimo 8 caracteres"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							disabled={isLoading}
						/>
					</div>
				)}
			</form.Field>
			<form.Field name="password_confirmation">
				{(field) => (
					<div>
						<Label htmlFor={field.name}>Confirmar password</Label>
						<Input
							type="password"
							id={field.name}
							placeholder="Repite tu contraseña"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							disabled={isLoading}
						/>
					</div>
				)}
			</form.Field>

			<form.Subscribe
				selector={(state) => [
					state.canSubmit,
					state.isSubmitting,
					state.values.email,
					state.values.password,
					state.values.password_confirmation,
				]}
			>
				{([
					canSubmit,
					isSubmitting,
					email,
					password,
					password_confirmation,
				]) => {
					const isEmpty =
						!String(email ?? "").trim() ||
						!String(password ?? "").trim() ||
						!String(password_confirmation ?? "").trim();
					return (
						<Button
							type="submit"
							variant="primary"
							expanded
							disabled={
								isEmpty || !canSubmit || Boolean(isSubmitting) || isLoading
							}
							className={styles.action}
						>
							Crear cuenta
						</Button>
					);
				}}
			</form.Subscribe>

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
