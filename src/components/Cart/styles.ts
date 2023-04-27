import { mapFontSize } from "lush/utils/mapFontSize";
import styled, { css } from "styled-components";

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

		color: ${theme.colours.text.default["000"]};
		background-color: ${theme.colours.background["500"]};
		${mapFontSize("complementarySmall")};
		font-weight: ${theme.typography.fontWeight.bold};
		line-height: 1;
	`
);

export const Header = styled.header(() => css``);

export const Close = styled.button(() => css``);

export const Cart = styled.aside<{
	isOpen: boolean;
}>(
	({ isOpen, theme }) => css`
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		right: 0;
		height: 100%;
		z-index: 100;
		padding: ${theme.space.regular};
		width: 25rem;

		background-color: ${theme.colours.background["000"]};
		box-shadow: -1px 0px 20px 0px rgba(0, 0, 0, 0.15);
		transform: translateX(${isOpen ? "0" : "100%"});
		transition: transform 0.3s ease-in-out;
	`
);

export const Overlay = styled.div(
	({ theme }) => css`
		background-color: ${theme.colours.background["900"]};
		top: 0;
		left: 0;
		position: fixed;
		height: 100%;
		width: 100%;
		z-index: 99;
		opacity: 0.6;

		animation: fadeIn 0.3s ease-in-out;

		@keyframes fadeIn {
			from {
				opacity: 0;
			}
			to {
				opacity: 0.6;
			}
		}
	`
);
