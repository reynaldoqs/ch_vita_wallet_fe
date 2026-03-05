import styles from './BalanceCard.module.css';

interface BalanceCardProps {
  currency: string;
  amount: number;
}

export function BalanceCard({ currency, amount }: BalanceCardProps) {
  return (
    <div className={styles.card}>
      <span>{currency}</span>
      <span>{amount}</span>
    </div>
  );
}
