import { apiClient } from './apiClient';

export const walletService = {
  getBalances: () => apiClient.get<unknown[]>('/wallet/balances'),
};
