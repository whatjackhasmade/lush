import styled, { css } from "styled-components";

export const Container = styled.div(
	({ theme }) => css`
		display: block;
		margin: 0 auto;
		max-width: 1200px;
		padding: 0 ${theme.space.large};
	`
);
