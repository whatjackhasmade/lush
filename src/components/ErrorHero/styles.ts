import { focus } from "lush/utils";
import styled, { css } from "styled-components";

export const ErrorHero = styled.div(
	({ theme }) => css`
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 20rem;
		justify-content: center;
		gap: ${theme.space.large};

		background-color: ${theme.colours.background["900"]};
		color: ${theme.colours.white};

		a {
			color: ${theme.colours.white};
			text-decoration: underline;
			display: inline-block;
			padding: ${theme.space.regular} ${theme.space.large};
			background-color: ${theme.colours.primary["500"]};
			border-radius: ${theme.space.xxxLarge};
			transition: background-color 0.2s ease;

			&:hover {
				background-color: ${theme.colours.primary["400"]};
				text-decoration: none;
			}

			${focus(
				css`
					background-color: ${theme.colours.primary["400"]};
					box-shadow: 0 0 0 0.2rem ${theme.colours.primary["500"]};
					text-decoration: none;
				`,
				css`
					box-shadow: 0 0 0 0.2rem ${theme.colours.primary["500"]};
				`
			)};
			)
		}
	`
);
