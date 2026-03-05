import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import styles from './LoginForm.module.css';

export function LoginForm() {
  return (
    <form className={styles.form}>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button type="submit">Login</Button>
    </form>
  );
}
