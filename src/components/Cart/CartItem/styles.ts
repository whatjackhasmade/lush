import styled, { css } from "styled-components";
import { Text } from "lush/components";
import { focus, mapFontSize } from "lush/utils";
import { motion } from "framer-motion";

export const Item = styled.div(
	({ theme }) => css`
		background-color: ${theme.colours.background["100"]};
		display: flex;
		flex-direction: column;
		padding: ${theme.space.regular};
	`
);

export const Header = styled.div(
	({ theme }) => css`
		align-items: flex-start;
		display: flex;
		justify-content: space-between;
		margin-bottom: ${theme.space.regular};
	`
);

export const Thumbnail = styled.div(
	({ theme }) => css`
		margin-right: ${theme.space.regular};
	`
);

export const Details = styled.div(
	({ theme }) => css`
		flex: 1;

		${/* sc-selector */ Text} {
			margin: ${theme.space.small} 0px ${theme.space.xSmall};

			color: ${theme.colours.default["600"]};
			${mapFontSize("labelSmall")};
			text-transform: uppercase;
			letter-spacing: 1px;
		}
	`
);

export const Quantity = styled.div(
	() => css`
		display: flex;
	`
);

export const Controls = styled.div(
	() => css`
		display: flex;
		justify-content: space-between;
	`
);

export const Input = styled.input(
	({ theme }) => css`
		display: inline-block;
		max-width: ${theme.space.xLarge};
		border: 1px solid ${theme.colours.background["200"]};
		border-left: none;
		border-right: none;
		text-align: center;
	`
);

export const QuantityUpdate = styled.button(
	({ theme }) => css`
		background-color: ${theme.colours.background["000"]};
		border: 1px solid ${theme.colours.background["200"]};
		padding: ${theme.space.xSmall};
		width: ${theme.space.xLarge};

		transition: background-color 0.15s ease;

		&:hover {
			background-color: ${theme.colours.background["100"]};
			border-color: ${theme.colours.background["300"]};
		}

		${focus(
			css`
				background-color: ${theme.colours.background["200"]};
				border-color: ${theme.colours.background["400"]};
			`,
			css`
				box-shadow: none;
			`
		)}
	`
);

export const Remove = styled.button(
	({ theme }) => css`
		margin-left: ${theme.space.regular};
		padding: ${theme.space.xxxSmall};
	`
);

export const Availability = styled.div(
	({ theme }) => css`
		align-items: center;
		display: flex;
		margin-top: ${theme.space.large};
	`
);

export const AvailabilityIcon = styled.div(
	({ theme }) => css`
		align-items: center;
		display: flex;
		justify-content: center;
		width: ${theme.space.regular};
		height: ${theme.space.regular};
		background-color: ${theme.colours.success["600"]};
		padding: ${theme.space.xxSmall};
		border-radius: 50%;
		margin-right: ${theme.space.xSmall};

		svg {
			color: ${theme.colours.default["000"]};
			width: ${theme.space.xSmall};
		}
	`
);
