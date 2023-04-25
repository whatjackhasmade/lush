import styled from "styled-components";

export const Cart = styled.a`
	display: flex;
	flex-direction: column;
	background-color: #fafafa;
	border-radius: 500px;
	width: 2rem;
	height: 2rem;
	justify-content: center;
	position: relative;
	align-items: center;
	padding: 0.5rem;
	transition: background-color 0.2s ease-in-out;

	&:active,
	&:focus,
	&:hover {
		background-color: #eee;
	}

	svg {
		width: 100%;
	}
`;

export const Count = styled.span`
	color: #fff;
	background-color: #555;
	border-radius: 500px;
	display: inline-block;
	font-size: 0.35rem;
	font-weight: 700;
	height: 0.8rem;
	line-height: 0.8rem;
	min-width: 0.8rem;
	text-align: center;
	vertical-align: middle;

	position: absolute;
	top: 0;
	right: 0;
	transform: translate(25%, -25%);
`;
