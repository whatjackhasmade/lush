import { deepMerge } from ".";

describe("deepMerge", () => {
	it("should merge two arrays correctly", () => {
		const target = [1, 2];
		const source = [3, 4];
		const result = deepMerge(target, source);

		expect(result).toEqual([1, 2, 3, 4]);
	});

	it("should merge two objects correctly", () => {
		const target = { foo: { bar: 1 }, baz: 2 };
		const source = { foo: { baz: 3 }, qux: 4 };
		const result = deepMerge(target, source);

		expect(result).toEqual({ foo: { bar: 1, baz: 3 }, baz: 2, qux: 4 });
	});
});
