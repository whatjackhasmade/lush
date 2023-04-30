export function isEqual(value: any, other: any) {
	// Get the value type
	const type = Object.prototype.toString.call(value);

	// If the two values are not of the same type, they are not equal
	if (type !== Object.prototype.toString.call(other)) return false;

	// If the value is a primitive type, compare the values
	if (
		["[object Number]", "[object String]", "[object Boolean]"].indexOf(type) >
		-1
	) {
		return value === other;
	}

	// If the value is an array, compare the arrays recursively
	if (type === "[object Array]") {
		if (value.length !== other.length) return false;

		for (let i = 0; i < value.length; i++) {
			if (!isEqual(value[i], other[i])) return false;
		}

		return true;
	}

	// If the value is an object, compare the object recursively
	if (type === "[object Object]") {
		const keys = Object.keys(value);

		if (keys.length !== Object.keys(other).length) return false;

		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];

			if (
				!Object.prototype.hasOwnProperty.call(other, key) ||
				!isEqual(value[key], other[key])
			) {
				return false;
			}
		}

		return true;
	}

	// If the value is a Date object, compare the Date objects
	if (type === "[object Date]") {
		return value.getTime() === other.getTime();
	}

	// If the value is a RegExp object, compare the RegExp objects
	if (type === "[object RegExp]") {
		return value.toString() === other.toString();
	}

	// If the value is any other type, they are not equal
	return false;
}
