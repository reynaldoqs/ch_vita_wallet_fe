export interface WalletState {
  balances: { currency: string; amount: number }[];
}

export const initialState: WalletState = { balances: [] };
