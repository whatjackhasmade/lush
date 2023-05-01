import styled, { css } from "styled-components";
import { above } from "lush/utils";

export const Layout = styled.div(
	({ theme }) => css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: ${theme.space.xLarge};
		padding-bottom: ${theme.space.xxxxLarge};

		${above.mobileLarge} {
			flex-direction: row-reverse;
			gap: ${theme.space.xxLarge};
		}

		${above.tabletPortrait} {
			gap: ${theme.space.xxxxLarge};
		}
	`
);

export const Left = styled.div(
	() => css`
		min-width: 0;
	`
);

export const Right = styled.div(() => css``);
