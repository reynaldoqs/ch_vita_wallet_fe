import { BalanceCard } from '../../molecules/BalanceCard/BalanceCard';
import styles from './BalanceList.module.css';

interface Balance { currency: string; amount: number; }

export function BalanceList({ balances = [] }: { balances?: Balance[] }) {
  return (
    <div className={styles.list}>
      {balances.map((b) => (
        <BalanceCard key={b.currency} currency={b.currency} amount={b.amount} />
      ))}
    </div>
  );
}
