import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { sileo } from "sileo";

type RejectedPayload = { data?: { message?: string } };

export const rtkQueryErrorLogger: Middleware = (_) => (next) => (action) => {
	if (isRejectedWithValue(action)) {
		// INFO: To log each error that comes from the backend
		sileo.error({
			title: "Backend error",
			description:
				(action.payload as RejectedPayload).data?.message ||
				"An error occurred",
		});
	}
	return next(action);
};
