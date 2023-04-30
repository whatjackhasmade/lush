type Merge<T, U> = T extends object
	? U extends object
		? T & U
		: never
	: T | U;

export function deepMerge<T, U>(target: T, source: U): Merge<T, U> {
	if (Array.isArray(target) && Array.isArray(source)) {
		return [...target, ...source] as Merge<T, U>;
	} else if (
		typeof target === "object" &&
		target !== null &&
		typeof source === "object" &&
		source !== null
	) {
		const result = { ...target } as Record<string, any>;
		const sourceAsObject = source as Record<string, any>;
		Object.keys(source).forEach((key) => {
			result[key] =
				key in target
					? deepMerge(result[key], sourceAsObject[key])
					: sourceAsObject[key];
		});
		return result as Merge<T, U>;
	} else {
		return source as Merge<T, U>;
	}
}
