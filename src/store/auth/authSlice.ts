import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";

export interface AuthState {
	user: User | null;
	token: string | null;
}

const persistedToken = (() => {
	try {
		const raw = localStorage.getItem("session");
		return raw ? (JSON.parse(raw) as string) : null;
	} catch {
		return null;
	}
})();

const initialState: AuthState = { user: null, token: persistedToken };

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const authReducer = authSlice.reducer;
export const { setToken, setUser, logout } = authSlice.actions;
