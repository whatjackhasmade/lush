export function tryJSONParse(json: string): Record<string, unknown> {
	try {
		return JSON.parse(json) ?? {};
	} catch {
		return {};
	}
}
