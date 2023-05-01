import styled, { css } from "styled-components";

export const AddToCart = styled.button(
	({ theme }) => css`
		align-self: center;
		display: flex;
		width: 100%;
		justify-content: center;
		padding: ${theme.space.large};
		background-color: ${theme.colours.background["900"]};
		color: ${theme.colours.background["000"]};
		transition: background-color 0.15s ease;

		&[disabled] {
			background-color: ${theme.colours.background["300"]};
		}
	`
);
