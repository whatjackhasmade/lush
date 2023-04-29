export enum SpaceEnum {
	xxxSmall = "0.125rem",
	xxSmall = "0.25rem",
	xSmall = "0.5rem",
	small = "0.75rem",
	regular = "1rem",
	large = "1.5rem",
	xLarge = "2rem",
	xxLarge = "2.5rem",
	xxxLarge = "3rem",
	xxxxLarge = "6rem",
}

export const space = Object.keys(SpaceEnum).reduce(
	(acc, key) => ({
		...acc,
		[key]: SpaceEnum[key as keyof typeof SpaceEnum],
	}),
	{} as { [key in keyof typeof SpaceEnum]: (typeof SpaceEnum)[key] }
);
