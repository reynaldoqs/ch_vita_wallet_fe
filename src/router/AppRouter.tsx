import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { LoginPage } from '../pages/Login/LoginPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { ExchangePage } from '../pages/Exchange/ExchangePage';
import { TransactionsPage } from '../pages/Transactions/TransactionsPage';

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <PrivateRoute />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/exchange', element: <ExchangePage /> },
      { path: '/transactions', element: <TransactionsPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
