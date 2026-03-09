import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { logout, setToken } from "@/store/auth/authSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: isAnyOf(logout, setToken),
	effect: async (action) => {
		if (action.type === "auth/logout") {
			localStorage.removeItem("session");
			return;
		}

		if (action.type === "auth/setToken") {
			localStorage.setItem("session", JSON.stringify(action.payload));
			return;
		}
	},
});

export const rtkSessionPersist = listenerMiddleware;
