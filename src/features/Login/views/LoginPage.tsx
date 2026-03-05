import { LoginForm } from "../components";
import { AuthLayout } from "../components/templates/AuthLayout/AuthLayout";

export function LoginPage() {
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	);
}
