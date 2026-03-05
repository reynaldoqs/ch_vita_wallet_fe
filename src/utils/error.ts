import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { ZodError } from "zod";

export function getErrorMessage(
	error: FetchBaseQueryError | SerializedError,
): string | undefined {
	if (
		"data" in error &&
		error.data != null &&
		typeof error.data === "object" &&
		"message" in error.data
	) {
		return (error.data as { message?: string }).message;
	}
	if ("message" in error && typeof error.message === "string")
		return error.message;
	return undefined;
}

export function getZodErrorMessage(error: ZodError): string {
	return error.issues.map((issue) => issue.message).join(", ");
}
