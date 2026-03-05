import { useNavigate } from "react-router-dom";
import { sileo } from "sileo";
import { Button, Input } from "@/components/atoms";
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
		<form className={styles.wrapper} action={submitForm}>
			<Input type="email" name="email" placeholder="Email" required />
			<Input type="password" name="password" placeholder="Password" required />
			<Button type="submit" disabled={isLoading}>
				Log In
			</Button>
		</form>
	);
}
