import styled, { css } from "styled-components";

export const Products = styled.div(
	({ theme }) => css`
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
		gap: ${theme.space.xxxLarge} ${theme.space.xLarge};
		margin-top: ${theme.space.xxLarge};
		padding-bottom: ${theme.space.xxxxLarge};
	`
);
