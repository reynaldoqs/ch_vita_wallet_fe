import amico from "@/assets/images/amico.svg";
import { LoginForm } from "../components";
import { AuthLayout } from "../components/templates/AuthLayout/AuthLayout";

export function SignInPage() {
	return (
		<AuthLayout aside={<LoginForm />}>
			<img src={amico} alt="Amico" />
		</AuthLayout>
	);
}
