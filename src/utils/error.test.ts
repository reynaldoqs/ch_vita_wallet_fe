import { describe, expect, it } from "vitest";
import { z } from "zod";
import { getErrorMessage, getZodErrorMessage } from "./error";

describe("getErrorMessage", () => {
	it("returns message from error.data.message", () => {
		const error = { status: 400, data: { message: "Bad request" } };
		expect(getErrorMessage(error)).toBe("Bad request");
	});

	it("returns message from error.message when data has no message", () => {
		const error = { message: "Something went wrong" };
		expect(getErrorMessage(error)).toBe("Something went wrong");
	});

	it("returns undefined when data.message is not a string", () => {
		const error = { status: 500, data: { code: 42 } };
		expect(getErrorMessage(error)).toBeUndefined();
	});

	it("returns undefined when error has no recognizable message field", () => {
		const error = { status: 500, data: null };
		expect(getErrorMessage(error)).toBeUndefined();
	});
});

describe("getZodErrorMessage", () => {
	it("joins all Zod issue messages with a comma", () => {
		const schema = z.object({
			email: z.string().email("Invalid email"),
			age: z.number().min(18, "Must be 18 or older"),
		});
		const result = schema.safeParse({ email: "not-an-email", age: 10 });
		if (result.success) throw new Error("Expected failure");
		const message = getZodErrorMessage(result.error);
		expect(message).toContain("Invalid email");
		expect(message).toContain("Must be 18 or older");
	});

	it("returns a single message when there is one issue", () => {
		const schema = z.string().min(5, "Too short");
		const result = schema.safeParse("ab");
		if (result.success) throw new Error("Expected failure");
		expect(getZodErrorMessage(result.error)).toBe("Too short");
	});
});
