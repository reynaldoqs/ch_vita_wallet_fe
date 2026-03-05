import { apiClient } from './apiClient';

export const transactionService = {
  getTransactions: () => apiClient.get<unknown[]>('/transactions'),
};
