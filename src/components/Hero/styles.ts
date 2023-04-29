import styled, { css } from "styled-components";

export const Hero = styled.div(
	({ theme }) => css`
		align-items: center;
		display: flex;
		justify-content: center;
		padding: ${theme.space.large};
		min-height: 400px;
		position: relative;

		margin-left: calc(-50vw + 50%);
		margin-right: calc(-50vw + 50%);

		img,
		picture {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			z-index: -1;
		}
	`
);

export const Contents = styled.div(() => css``);
