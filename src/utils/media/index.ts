import { Breakpoint } from "lush/enums";
import { breakpoints } from "lush/theme/breakpoints";

type Above = {
	[key in Breakpoint]: string;
};

export const above = Object.keys(breakpoints).reduce(
	(accumulator, key) => ({
		...accumulator,
		[key]: `@media (min-width: ${
			breakpoints[key as keyof typeof breakpoints]
		}px)`,
	}),
	{} as Above
);

type Below = {
	[key in Breakpoint]: string;
};

export const below = Object.keys(breakpoints).reduce(
	(accumulator, key) => ({
		...accumulator,
		[key]: `@media (max-width: ${
			breakpoints[key as keyof typeof breakpoints] - 1
		}px)`,
	}),
	{} as Below
);

type Between = {
	[fromKey in Breakpoint]: {
		[toKey in Breakpoint]: string;
	};
};

export const between = Object.keys(breakpoints).reduce(
	(mediaAbove, fromKey) => ({
		...mediaAbove,
		[fromKey]: Object.keys(breakpoints).reduce((mediaBelow, toKey) => {
			const min = breakpoints[fromKey as keyof typeof breakpoints];
			const max = `${breakpoints[toKey as keyof typeof breakpoints] - 1}`;

			return {
				...mediaBelow,
				[toKey]: `@media (min-width: ${min}px) and (max-width: ${max}px)`,
			};
		}, {}),
	}),
	{} as Between
);

export const hover = "@media (hover: hover) and (pointer: fine)";
