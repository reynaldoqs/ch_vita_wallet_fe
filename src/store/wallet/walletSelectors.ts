import type { WalletState } from './walletSlice';

export const selectBalances = (state: { wallet: WalletState }) => state.wallet.balances;
