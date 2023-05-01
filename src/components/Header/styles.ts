import styled, { css } from "styled-components";

export const Header = styled.header(
	({ theme }) => css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: ${theme.space.regular} 0;

		a {
			color: inherit;
			text-decoration: underline;

			&:hover {
				text-decoration: none;
			}
		}
	`
);

export const Navigation = styled.nav(
	({ theme }) => css`
		display: flex;
		gap: ${theme.space.regular};
	`
);

export const Title = styled.h1`
	font-family: var(--font-handwritten);
`;

export const Actions = styled.div(
	({ theme }) => css`
		align-items: center;
		display: flex;
		gap: ${theme.space.regular};
	`
);
