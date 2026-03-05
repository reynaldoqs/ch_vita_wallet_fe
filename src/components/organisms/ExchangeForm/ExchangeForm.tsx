import { Button } from '../../atoms/Button/Button';
import { CurrencySelector } from '../../molecules/CurrencySelector/CurrencySelector';
import styles from './ExchangeForm.module.css';

export function ExchangeForm() {
  return (
    <form className={styles.form}>
      <CurrencySelector value="" onChange={() => {}} options={[]} />
      <CurrencySelector value="" onChange={() => {}} options={[]} />
      <Button type="submit">Exchange</Button>
    </form>
  );
}
