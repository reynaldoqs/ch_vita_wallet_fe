import { Select } from '../../atoms/Select/Select';
import styles from './CurrencySelector.module.css';

interface CurrencySelectorProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

export function CurrencySelector({ value, onChange, options }: CurrencySelectorProps) {
  return (
    <Select className={styles.selector} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </Select>
  );
}
