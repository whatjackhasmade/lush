import styled, { css } from "styled-components";

export const Gallery = styled.div(
	({ theme }) => css`
		display: flex;
		gap: ${theme.space.regular};
		height: 50vh;
		overflow-x: auto;
	`
);

export const Skeleton = styled.div`
	position: relative;
	aspect-ratio: 3 / 5;
	height: 100%;
`;

export const GalleryItem = styled.div`
	position: relative;
	aspect-ratio: 3 / 5;
	height: 100%;

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
