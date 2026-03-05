export interface AuthState {
  user: { email: string } | null;
  token: string | null;
}

export const initialState: AuthState = { user: null, token: null };
