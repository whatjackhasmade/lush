export const typography = {
	baseFontSize: "16px",
	fontFamily: {
		handwritten: "var(--font-handwritten)",
		inter: "var(--font-inter)",
	},
	fontSize: {
		complementarySmall: {
			desktop: "0.5rem",
			mobile: "0.625rem",
		},
		complementary: {
			desktop: "0.625rem",
			mobile: "0.75rem",
		},
		labelSmall: {
			desktop: "0.75rem",
			mobile: "0.8125rem",
		},
		labelRegular: {
			desktop: "0.8125rem",
			mobile: "0.875rem",
		},
		labelLarge: {
			desktop: "0.875rem",
			mobile: "1rem",
		},
		default: {
			desktop: "1rem",
			mobile: "1.125rem",
		},
		displaySmall: {
			desktop: "1.125rem",
			mobile: "1.3125rem",
		},
		displayRegular: {
			desktop: "1.4375rem",
			mobile: "1.4375rem",
		},
		displayLarge: {
			desktop: "2rem",
			mobile: "1.6875rem",
		},
	},
	fontWeight: {
		regular: 400,
		medium: 500,
		bold: 700,
	},
} as const;
