import styles from './TransactionItem.module.css';

interface TransactionItemProps {
  id: string;
  type: string;
  amount: number;
  currency: string;
}

export function TransactionItem({ id, type, amount, currency }: TransactionItemProps) {
  return (
    <div className={styles.item}>
      <span>{id}</span>
      <span>{type}</span>
      <span>{amount} {currency}</span>
    </div>
  );
}
