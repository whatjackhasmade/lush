export function wait(ms = 0) {
	return new Promise(function (resolve) {
		return setTimeout(resolve, ms);
	});
}
