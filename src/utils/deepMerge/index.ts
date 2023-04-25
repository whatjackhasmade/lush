export function deepMerge(
	target: Record<string, any>,
	source: Record<string, any>
) {
	const isObject = (obj: Record<string, any>) => obj && typeof obj === "object";

	if (!isObject(target) || !isObject(source)) {
		return source === undefined ? target : source;
	}

	const merged = { ...target };

	Object.keys(source).forEach((key) => {
		if (isObject(source[key])) {
			if (!(key in target)) {
				Object.assign(merged, { [key]: source[key] });
			} else {
				merged[key] = deepmerge(target[key], source[key]);
			}
		} else {
			Object.assign(merged, { [key]: source[key] });
		}
	});

	return merged;
}
