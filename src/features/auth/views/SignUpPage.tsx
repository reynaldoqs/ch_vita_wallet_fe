import amico from "@/assets/images/amico.svg";
import { SignUpForm } from "../components";
import { AuthLayout } from "../components/templates/AuthLayout/AuthLayout";

export function SignUpPage() {
	return (
		<AuthLayout aside={<SignUpForm />}>
			<img src={amico} alt="Amico" />
		</AuthLayout>
	);
}
