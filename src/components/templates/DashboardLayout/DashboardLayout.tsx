import { Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.css';

export function DashboardLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>Dashboard</header>
      <main className={styles.main}><Outlet /></main>
    </div>
  );
}
