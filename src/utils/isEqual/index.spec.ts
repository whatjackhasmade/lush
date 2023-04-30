import { isEqual } from ".";

describe("isEqual", () => {
	it("should return true if two primitive values are equal", () => {
		expect(isEqual(1, 1)).toBe(true);
		expect(isEqual("foo", "foo")).toBe(true);
		expect(isEqual(true, true)).toBe(true);
	});

	it("should return false if two primitive values are not equal", () => {
		expect(isEqual(1, 2)).toBe(false);
		expect(isEqual("foo", "bar")).toBe(false);
		expect(isEqual(true, false)).toBe(false);
	});

	it("should return true if two arrays are equal", () => {
		const arr1 = [1, "foo", true];
		const arr2 = [1, "foo", true];
		expect(isEqual(arr1, arr1)).toBe(true);
		expect(isEqual(arr2, arr2)).toBe(true);
	});

	it("should return false if two arrays are not equal", () => {
		const arr1 = [1, "foo", true];
		const arr2 = [1, "bar", false];
		expect(isEqual(arr1, arr2)).toBe(false);
	});

	it("should return true if two objects are equal", () => {
		const obj1 = { a: 1, b: "foo", c: true };
		const obj2 = { a: 1, b: "foo", c: true };
		expect(isEqual(obj1, obj1)).toBe(true);
		expect(isEqual(obj2, obj2)).toBe(true);
	});

	it("should return false if two objects are not equal", () => {
		const obj1 = { a: 1, b: "foo", c: true };
		const obj2 = { a: 1, b: "bar", c: false };
		expect(isEqual(obj1, obj2)).toBe(false);
	});

	it("should return true if two Date objects are equal", () => {
		const date1 = new Date(2021, 0, 1);
		const date2 = new Date(2021, 0, 1);
		expect(isEqual(date1, date1)).toBe(true);
		expect(isEqual(date2, date2)).toBe(true);
	});

	it("should return false if two Date objects are not equal", () => {
		const date1 = new Date(2021, 0, 1);
		const date2 = new Date(2022, 0, 1);
		expect(isEqual(date1, date2)).toBe(false);
	});

	it("should return true if two RegExp objects are equal", () => {
		const regex1 = /[a-z]+/i;
		const regex2 = /[a-z]+/i;
		expect(isEqual(regex1, regex1)).toBe(true);
		expect(isEqual(regex2, regex2)).toBe(true);
	});

	it("should return false if two RegExp objects are not equal", () => {
		const regex1 = /[a-z]+/i;
		const regex2 = /[0-9]+/i;
		expect(isEqual(regex1, regex2)).toBe(false);
	});

	it("should return false if two values are not of the same type", () => {
		expect(isEqual(1, "1")).toBe(false);
		expect(isEqual("foo", true)).toBe(false);
		expect(isEqual(true, {})).toBe(false);
	});

	it("should return false if two arrays are not of the same length", () => {
		const arr1 = [1, "foo", true];
		const arr2 = [1, "foo", true, "bar"];
		expect(isEqual(arr1, arr2)).toBe(false);
	});

	it("should return false if two objects do not have the same key length", () => {
		const obj1 = { a: 1, b: "foo", c: true };
		const obj2 = { a: 1, b: "foo" };
		expect(isEqual(obj1, obj2)).toBe(false);
	});

	it("should return false if type is not checked", () => {
		expect(isEqual(null, null)).toBe(false);
		expect(isEqual(undefined, undefined)).toBe(false);
		expect(isEqual(Symbol("foo"), Symbol("foo"))).toBe(false);
	});
});
