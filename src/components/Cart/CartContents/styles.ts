import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const Cart = styled(motion.aside).attrs(({ theme }) => ({
	animate: "in",
	exit: "out",
	initial: "out",
	transition: {
		duration: theme.animation.duration * 2,
	},
	variants: {
		in: {
			x: "0%",
		},
		out: {
			x: "100%",
		},
	},
}))(
	({ theme }) => css`
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		right: 0;
		height: 100%;
		z-index: 100;
		width: 25rem;
		max-width: 100%;
		background-color: ${theme.colours.background["000"]};

		overflow: visible;
	`
);

export const Contents = styled.div(
	() => css`
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow-y: scroll;
		height: 100%;
	`
);

export const Header = styled.header(
	({ theme }) => css`
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: ${theme.space.large} ${theme.space.regular} ${theme.space.xLarge};
		background-color: ${theme.colours.background["000"]};
		position: sticky;
		top: 0px;
		z-index: 100;
	`
);

export const Close = styled.button(
	({ theme }) => css`
		display: flex;
		height: ${theme.space.xLarge};
		padding: ${theme.space.xSmall};
		width: ${theme.space.xLarge};
	`
);

export const Content = styled.div(
	({ theme }) => css`
		flex: 1;
		padding: 0 ${theme.space.regular} ${theme.space.xLarge};
	`
);

export const Items = styled.div(
	({ theme }) => css`
		display: flex;
		flex-direction: column;
		gap: ${theme.space.regular};
	`
);
