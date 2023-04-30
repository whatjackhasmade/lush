import { wait } from ".";

describe("wait", () => {
	it("should wait for the given time before resolving the promise", async () => {
		const startTime = Date.now();
		await wait(1000);
		const endTime = Date.now();
		expect(endTime - startTime).toBeGreaterThanOrEqual(1000);
	});

	it("should resolve the promise immediately if no time is provided", async () => {
		const startTime = Date.now();
		await wait();
		const endTime = Date.now();
		expect(endTime - startTime).toBeLessThan(10);
	});
});
