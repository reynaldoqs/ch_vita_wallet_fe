import { apiClient } from './apiClient';

export const authService = {
  login: (email: string, password: string) => apiClient.post<{ token: string }>('/auth/login', { email, password }),
  logout: () => Promise.resolve(),
};
