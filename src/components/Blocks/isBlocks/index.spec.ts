import { isBlocks } from ".";

describe("isBlocks function", () => {
	it("should return true when given an array of valid block objects", () => {
		const validBlocks = [
			{
				id: "1",
				data: { text: "Hello" },
				type: "text",
			},
			{
				id: "2",
				data: { text: "World" },
				type: "text",
			},
		];

		expect(isBlocks(validBlocks)).toBe(true);
	});

	it("should return false when given null", () => {
		expect(isBlocks(null)).toBe(false);
	});

	it("should return false when given a non-array value", () => {
		expect(isBlocks("not an array")).toBe(false);
	});

	it("should return false when given an array containing an invalid block object", () => {
		const invalidBlocks = [
			{
				id: "1",
				data: { text: "Hello" },
				type: "text",
			},
			{
				id: "2",
				type: "text", // missing data.text property
			},
		];

		expect(isBlocks(invalidBlocks)).toBe(false);
	});

	it("should return false when given an array containing an object with an invalid id property", () => {
		const invalidBlocks = [
			{
				id: 1, // should be a string
				data: { text: "Hello" },
				type: "text",
			},
		];

		expect(isBlocks(invalidBlocks)).toBe(false);
	});

	it("should return false when given an array containing an object with an invalid type property", () => {
		const invalidBlocks = [
			{
				id: "1",
				data: { text: "Hello" },
				type: 123, // should be a string
			},
		];

		expect(isBlocks(invalidBlocks)).toBe(false);
	});

	it("should return false when given an array containing an object with an invalid data.text property", () => {
		const invalidBlocks = [
			{
				id: "1",
				data: { text: 123 }, // should be a string
				type: "text",
			},
		];

		expect(isBlocks(invalidBlocks)).toBe(false);
	});
});
