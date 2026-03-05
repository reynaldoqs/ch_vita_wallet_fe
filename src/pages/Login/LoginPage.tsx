import { AuthLayout } from '../../components/templates/AuthLayout/AuthLayout';
import { LoginForm } from '../../components/organisms/LoginForm/LoginForm';

export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
