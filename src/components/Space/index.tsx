// Flexible space component to abstract margin and padding as side effects
import styled from "styled-components";
import { FC, ReactNode } from "react";
import { mapMargin } from "lush/utils";

export interface SpaceProps {
	as?: "div" | "span";
	children?: ReactNode;
	margin?: Parameters<typeof mapMargin>[0];
}

const Wrapper = styled.div<Omit<SpaceProps, "as">>((props) =>
	mapMargin(props.margin)
);

export const Space: FC<SpaceProps> = ({ as, children, ...props }) => (
	<Wrapper as={as} {...props}>
		{children}
	</Wrapper>
);
