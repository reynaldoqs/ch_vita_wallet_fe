import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "react-router-dom";
import { sileo } from "sileo";
import { Button, Input, Label, Typography } from "@/components/atoms";
import { useLoginMutation } from "@/services/authService";
import { type LoginRequest, loginRequestSchema } from "@/types/auth.types";
import { getErrorMessage } from "@/utils";
import styles from "./LoginForm.module.css";

export function LoginForm() {
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: loginRequestSchema,
		},
		onSubmit: async (data) => {
			await submitForm(data.value);
		},
	});

	const submitForm = async (formData: LoginRequest) => {
		sileo.promise(login(formData).unwrap(), {
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
		<form
			className={styles.form}
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Typography variant="title" as="h1" className={styles.title}>
				Iniciar sesión
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
							placeholder="Escribe tu contraseña"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							disabled={isLoading}
						/>
					</div>
				)}
			</form.Field>
			<Typography variant="caption2" className={styles.forgotPassword}>
				¿Olvidaste tu contraseña?
			</Typography>
			<form.Subscribe
				selector={(state) => [
					state.canSubmit,
					state.isSubmitting,
					state.values.email,
					state.values.password,
				]}
			>
				{([canSubmit, isSubmitting, email, password]) => {
					const isEmpty =
						!String(email ?? "").trim() || !String(password ?? "").trim();
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
							Iniciar sesión
						</Button>
					);
				}}
			</form.Subscribe>
			<Typography variant="body" as="p" className={styles.footer}>
				¿No tienes cuenta? <Link to="/signup">Crear cuenta</Link>
			</Typography>
		</form>
	);
}
