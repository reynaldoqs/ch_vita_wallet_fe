export interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
}

export interface TransactionsState {
  items: Transaction[];
}

export const initialState: TransactionsState = { items: [] };
