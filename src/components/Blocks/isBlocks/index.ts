export const isBlocks = (
	blocks: unknown
): blocks is {
	id: string;
	data: {
		text: string;
	};
	type: string;
}[] => {
	if (!blocks) return false;

	if (!Array.isArray(blocks)) return false;

	return blocks.every((block) => {
		if (typeof block?.id !== "string") return false;
		if (typeof block?.type !== "string") return false;
		if (typeof block?.data?.text !== "string") return false;
		return true;
	});
};
