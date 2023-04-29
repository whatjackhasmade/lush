import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const Overlay = styled(motion.div).attrs(({ theme }) => ({
	animate: "in",
	exit: "out",
	initial: "out",
	transition: {
		duration: theme.animation.duration * 2,
	},
	variants: {
		in: {
			opacity: 0.8,
		},
		out: {
			opacity: 0,
		},
	},
}))(
	({ theme }) => css`
		background-color: ${theme.colours.background["900"]};
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99;
	`
);
