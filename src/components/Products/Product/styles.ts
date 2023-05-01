import { mapFontSize } from "lush/utils/mapFontSize";
import styled, { css } from "styled-components";

export const Product = styled.article(
	({ theme }) => css`
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;
		transition: background 0.3s ease 0s;
		flex: 1 0 auto;
		margin-bottom: 1.6875rem;
		border-radius: ${theme.space.xSmall};

		background-color: ${theme.colours.background["100"]};

		a {
			color: inherit;
			text-decoration: none;
		}
	`
);

export const Image = styled.div`
	text-align: center;
	width: 100%;
`;

export const Info = styled.div(
	({ theme }) => css`
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		padding: ${theme.space.regular} ${theme.space.regular}
			${theme.space.xxxLarge};
	`
);

export const View = styled.button(
	({ theme }) => css`
		position: absolute;
		bottom: 0;
		left: 50%;
		text-align: center;
		transform: translate(-50%, 50%);
		white-space: nowrap;

		background-color: ${theme.colours.background["000"]};
		border-radius: ${theme.space.xxLarge};
		${mapFontSize("labelLarge")};
		letter-spacing: 1px;
		padding: ${theme.space.regular};
		border: 1px solid ${theme.colours.background["100"]};
	`
);
