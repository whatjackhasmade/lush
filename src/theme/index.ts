import { breakpoints } from "./breakpoints";
import { colours } from "./colours";
import { space } from "./space";
import { typography } from "./typography";

export const theme = {
	breakpoints,
	colours,
	space,
	typography,
} as const;

export type Theme = typeof theme;
