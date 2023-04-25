import styled, { css } from "styled-components";

export const Header = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
`;

export const Filters = styled.div``;

export const Categories = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem 1rem;
`;

export const Input = styled.input`
	position: absolute;
	width: 1px;
	height: 1px;
	overflow: hidden;
	white-space: nowrap;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);

	&:focus {
		& + label {
			background-color: #eee;
		}
	}
`;

export const Category = styled.label<{
	isActive?: boolean;
	isFull?: boolean;
}>(
	({ isActive, isFull }) => css`
		display: inline-block;
		border: 2px solid transparent;
		cursor: pointer;
		border-radius: 50px;
		padding: 0.5rem 1rem;

		${isFull &&
		css`
			background-color: #000;
			color: #fff;
		`}

		${isActive &&
		css`
			border-color: ${isFull ? "#fff" : "#000"};
		`}
	`
);

export const Skeleton = styled.div`
	display: flex;
	height: 2.4rem;
	width: 7rem;
`;
