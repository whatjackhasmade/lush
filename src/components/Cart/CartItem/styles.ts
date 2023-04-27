import styled, { css } from "styled-components";

export const Item = styled.div(
	({ theme }) => css`
		background-color: ${theme.colours.background["100"]};
		display: flex;
		flex-direction: column;
		padding: ${theme.space.regular};
	`
);

export const Header = styled.div(
	({ theme }) => css`
		align-items: flex-start;
		display: flex;
		justify-content: space-between;
		margin-bottom: ${theme.space.regular};
	`
);

export const Quantity = styled.div(
	() => css`
		display: flex;
	`
);

export const Input = styled.input(
	() => css`
		display: inline-block;
		max-width: 2rem;
		text-align: center;
	`
);

export const QuantityUpdate = styled.button(
	({ theme }) => css`
		background-color: ${theme.colours.background["000"]};
		padding: ${theme.space.xSmall};
	`
);
