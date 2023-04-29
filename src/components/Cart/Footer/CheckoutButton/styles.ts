import styled, { css } from "styled-components";
import { focus, hover } from "lush/utils";

export const Button = styled.button(
	({ theme }) => css`
		padding: ${theme.space.large};
		width: 100%;

		background-color: ${theme.colours.background["800"]};
		color: ${theme.colours.default["000"]};
		transition: background-color 0.2s ease;

		${hover} {
			&:hover {
				background-color: ${theme.colours.background["900"]};
			}
		}

		&:active {
			background-color: ${theme.colours.background["1000"]};
		}

		&:disabled {
			background-color: ${theme.colours.background["500"]};
			cursor: not-allowed;
		}

		&[aria-busy] {
			pointer-events: none;
		}

		${focus(
			css`
				box-shadow: ${`inset 0px 0px 0px 2px ${theme.colours.background["100"]}`};
				background-color: ${theme.colours.background["900"]};
			`,
			css`
				box-shadow: none;
			`
		)}
	`
);
