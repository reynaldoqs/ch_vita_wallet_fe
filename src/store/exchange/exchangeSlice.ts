export interface ExchangeState {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

export const initialState: ExchangeState = {
  fromCurrency: '',
  toCurrency: '',
  amount: 0,
};
