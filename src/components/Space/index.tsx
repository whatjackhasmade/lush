// Flexible space component to abstract margin and padding as side effects
import styled, { css } from "styled-components";
import { FC, ReactNode } from "react";

enum SpaceEnum {
	xxxSmall = "0.125rem",
	xxSmall = "0.25rem",
	xSmall = "0.5rem",
	small = "0.75rem",
	regular = "1rem",
	large = "1.5rem",
	xLarge = "2rem",
	xxLarge = "2.5rem",
	xxxLarge = "3rem",
}

export interface SpaceProps {
	as?: "div" | "span";
	children?: ReactNode;
	margin?: {
		top?: keyof typeof SpaceEnum;
		right?: keyof typeof SpaceEnum;
		bottom?: keyof typeof SpaceEnum;
		left?: keyof typeof SpaceEnum;
	};
}

const mapMargin = (margin: SpaceProps["margin"]) => {
	if (!margin) return;

	const { top, right, bottom, left } = margin;

	return css`
		margin-top: ${top && SpaceEnum[top]};
		margin-right: ${right && SpaceEnum[right]};
		margin-bottom: ${bottom && SpaceEnum[bottom]};
		margin-left: ${left && SpaceEnum[left]};
	`;
};

const Wrapper = styled.div<Omit<SpaceProps, "as">>((props) => {
	return css`
		${mapMargin(props.margin)};
	`;
});

export const Space: FC<SpaceProps> = ({ as, children, ...props }) => (
	<Wrapper as={as} {...props}>
		{children}
	</Wrapper>
);
