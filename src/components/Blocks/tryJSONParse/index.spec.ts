import { tryJSONParse } from ".";

describe("tryJSONParse", () => {
	it("should return an empty object if JSON string is empty", () => {
		expect(tryJSONParse("")).toEqual({});
	});

	it("should return an object when valid JSON string is passed", () => {
		const jsonString = '{ "name": "John", "age": 30 }';
		expect(tryJSONParse(jsonString)).toEqual({ name: "John", age: 30 });
	});

	it("should return an empty object if invalid JSON string is passed", () => {
		const invalidJsonString = "this is not a valid json";
		expect(tryJSONParse(invalidJsonString)).toEqual({});
	});
});
