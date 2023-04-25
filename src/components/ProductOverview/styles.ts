import styled from "styled-components";

export const ImageFeatured = styled.img`
	max-width: 200px;
`;

export const Gallery = styled.div`
	display: flex;
	gap: 1rem;
	height: 400px;
`;

export const GalleryItem = styled.div`
	position: relative;
	height: 100%;
	width: 200px;

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const Header = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
`;
