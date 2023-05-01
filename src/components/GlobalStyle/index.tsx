import { createGlobalStyle, css } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle(
	({ theme }) => css`
		${normalize};

		*,
		*:before,
		*:after {
			box-sizing: border-box;
			padding: 0;
			margin: 0;
			text-decoration: none;
			border: none;
			outline: none;
			-webkit-tap-highlight-color: transparent;

			/* https://www.w3.org/WAI/WCAG21/Techniques/css/C39 */
			@media (prefers-reduced-motion: reduce) {
				background-attachment: initial !important;
				transition-delay: 0s !important;
				transition-duration: 0s !important;
				animation-duration: 1ms !important;
				animation-delay: -1ms !important;
				animation-iteration-count: 1 !important;
				scroll-behavior: auto !important;
			}
		}

		/* Remove unwanted focus styles in Firefox */
		button:focus-visible,
		[type="button"]:focus-visible,
		[type="reset"]:focus-visible,
		[type="submit"]:focus-visible {
			outline: none;
		}

		html {
			font-family: var(--font-inter);
		}

		html,
		body {
			height: 100%;
		}

		body {
			overscroll-behavior: none;
			overflow-x: hidden;
			overflow-y: scroll;
			color: ${theme.colours.default["900"]};
			font-size: ${theme.typography.baseFontSize};
			text-rendering: optimizeLegibility;
			background-color: ${theme.colours.background["000"]};
		}

		*:focus,
		*:focus-visible {
			box-shadow: ${theme.colours.focus} 0px 0px 0px 2px inset;
		}

		a {
			color: inherit;
		}

		button {
			background-color: transparent;
			cursor: pointer;

			&[disabled] {
				cursor: not-allowed;
			}
		}

		img {
			max-width: 100%;
		}
	`
);
