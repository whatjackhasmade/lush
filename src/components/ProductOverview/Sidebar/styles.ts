import styled, { css } from "styled-components";

export const Header = styled.div(
	({ theme }) => css`
		display: flex;
		justify-content: space-between;
		margin-bottom: ${theme.space.regular};
		gap: ${theme.space.regular};
	`
);

export const ProductOverview = styled.div(
	() => css`
		flex: 1;
	`
);

export const Sidebar = styled.div(
	() => css`
		display: flex;
		flex-direction: column;
	`
);

export const Quantity = styled.div(
	() => css`
		display: flex;
	`
);

export const Input = styled.input(
	({ theme }) => css`
		display: inline-block;
		border: 1px solid ${theme.colours.background["200"]};
		text-align: center;
	`
);

export const QuantityUpdate = styled.button(
	({ theme }) => css`
		background-color: ${theme.colours.background["000"]};
		padding: ${theme.space.small};
		width: ${theme.space.xxxxLarge};

		transition: background-color 0.15s ease;

		&:not([disabled]) {
			&:hover {
				background-color: ${theme.colours.background["100"]};
				border-color: ${theme.colours.background["300"]};
			}
		}
	`
);
