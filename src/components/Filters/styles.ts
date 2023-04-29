import styled, { css } from "styled-components";

export const Header = styled.div(
	({ theme }) => css`
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin-bottom: ${theme.space.regular};
	`
);

export const Filters = styled.div``;

export const Categories = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem 1rem;
`;

export const Input = styled.input(
	({ theme }) => css`
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		white-space: nowrap;
		clip: rect(0 0 0 0);
		clip-path: inset(50%);

		&:focus,
		&:focus-visible {
			& + label {
				box-shadow: ${theme.colours.primary["400"]} 0px 0px 0px 2px inset;
			}
		}
	`
);

export const Category = styled.label<{
	isActive?: boolean;
}>(
	({ isActive, theme }) => css`
		display: inline-block;
		border: 2px solid transparent;
		cursor: pointer;
		border-radius: 50px;
		padding: ${theme.space.xSmall} ${theme.space.regular};

		${isActive &&
		css`
			background-color: ${theme.colours.success["500"]};
			color: ${theme.colours.default["000"]};
		`}
	`
);
