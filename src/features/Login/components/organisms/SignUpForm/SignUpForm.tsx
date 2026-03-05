import { Button, Input } from "@/components/atoms";
import styles from "./SignUpForm.module.css";

export function SignUpForm() {
	return (
		<form className={styles.wrapper}>
			<Input type="email" placeholder="Email" />
			<Input type="password" placeholder="Password" />
			<Button type="submit">Sign Up</Button>
		</form>
	);
}
