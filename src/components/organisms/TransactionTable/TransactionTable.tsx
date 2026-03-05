import { TransactionItem } from '../../molecules/TransactionItem/TransactionItem';
import styles from './TransactionTable.module.css';

interface Transaction { id: string; type: string; amount: number; currency: string; }

export function TransactionTable({ items = [] }: { items?: Transaction[] }) {
  return (
    <div className={styles.table}>
      {items.map((t) => (
        <TransactionItem key={t.id} id={t.id} type={t.type} amount={t.amount} currency={t.currency} />
      ))}
    </div>
  );
}
