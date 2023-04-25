import styled from "styled-components";

export const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 0;

	a {
		color: inherit;
	}
`;

export const Navigation = styled.nav`
	display: flex;
	gap: 1rem;
`;

export const Title = styled.h1`
	font-family: var(--font-handwritten);
`;

export const Actions = styled.div`
	align-items: center;
	display: flex;
	gap: 1rem;
`;
