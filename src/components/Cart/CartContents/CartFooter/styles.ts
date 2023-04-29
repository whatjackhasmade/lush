import styled, { css } from "styled-components";

export const Footer = styled.div(
	({ theme }) => css`
		z-index: 100;
		position: sticky;
		bottom: 0px;
		background-color: ${theme.colours.background["000"]};
	`
);

export const Info = styled.div(
	({ theme }) => css`
		display: flex;
		flex-direction: column;
		padding: ${theme.space.regular};
	`
);

export const Total = styled.div(
	({ theme }) => css`
		display: flex;
		align-items: center;
		flex: 1;
		justify-content: space-between;
		margin-bottom: ${theme.space.regular};
	`
);

export const Delivery = styled.div(
	() => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
	`
);
