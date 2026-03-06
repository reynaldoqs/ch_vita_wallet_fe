import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import { authService, walletService } from "@/services";
import { authReducer } from "./auth";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[authService.reducerPath]: authService.reducer,
		[walletService.reducerPath]: walletService.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authService.middleware,
			walletService.middleware,
		),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
