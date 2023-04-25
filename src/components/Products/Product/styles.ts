import styled from "styled-components";

export const Product = styled.article`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	transition: background 0.3s ease 0s;
	flex: 1 0 auto;
	margin-bottom: 1.6875rem;
	border-radius: 0.5rem;

	background-color: rgb(244, 242, 244);

	a {
		color: inherit;
		text-decoration: none;
	}
`;

export const Image = styled.div`
	text-align: center;
	width: 100%;
`;

export const Info = styled.div`
	align-items: flex-start;
	display: flex;
`;

export const View = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	text-align: center;
	transform: translateY(50%);

	a {
		transition: all 250ms ease 0s;
		outline: none;
		text-decoration: none;
		line-height: 1;
		background-color: white;
		border-radius: 200px;
		font-size: 0.875rem;
		letter-spacing: 1px;
		padding: 1rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgb(234, 234, 234);
	}
`;

export const Title = styled.h3`
	font-family: var(--font-handwritten);
`;
