export function deepMerge(
	target: any[] | Record<string, any>,
	source: any[] | Record<string, any>
) {
	if (Array.isArray(target) && Array.isArray(source)) {
		return target.concat(source);
	}

	if (
		typeof target === "object" &&
		typeof source === "object" &&
		target !== null &&
		source !== null
	) {
		const merged = {};

		for (const key of Object.keys(target)) {
			if (source.hasOwnProperty(key)) {
				merged[key] = deepMerge(target[key], source[key]);
			} else {
				merged[key] = target[key];
			}
		}

		for (const key of Object.keys(source)) {
			if (!merged.hasOwnProperty(key)) {
				merged[key] = source[key];
			}
		}

		return merged;
	}

	return source;
}
