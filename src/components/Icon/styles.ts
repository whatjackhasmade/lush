import styled, { css } from "styled-components";

export interface WrapperProps {}

export const Wrapper = styled.span<WrapperProps>(
	({ theme }) => css`
		display: inline-flex;

		svg {
			display: block;
			height: auto;
			width: ${theme.space.regular};

			* {
				fill: currentColor;
			}
		}
	`
);
