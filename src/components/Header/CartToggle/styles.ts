import styled, { css } from "styled-components";
import { mapFontSize } from "lush/utils";

export const Toggle = styled.button`
	display: flex;
	flex-direction: column;
	background-color: #fafafa;
	border-radius: 500px;
	width: 2rem;
	height: 2rem;
	justify-content: center;
	position: relative;
	align-items: center;
	padding: 0.5rem;
	transition: background-color 0.2s ease-in-out;

	&:active,
	&:focus,
	&:hover {
		background-color: #eee;
	}

	svg {
		width: 100%;
	}
`;

export const Count = styled.span(
	({ theme }) => css`
		align-items: center;
		border-radius: 500px;
		display: flex;
		height: ${theme.space.small};
		justify-content: center;
		min-width: ${theme.space.small};
		position: absolute;
		right: 0;
		top: 0;
		transform: translate(25%, -25%);

		color: ${theme.colours.default["000"]};
		background-color: ${theme.colours.background["900"]};
		${mapFontSize("complementarySmall")};
		font-weight: ${theme.typography.fontWeight.bold};
		line-height: 1;
	`
);
