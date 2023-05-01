import styled, { css } from "styled-components";
import type { DefaultTheme } from "styled-components";
import { mapMargin } from "lush/utils";
import { mapFontSize } from "lush/utils/mapFontSize";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	colourKey?: keyof DefaultTheme["colours"];
	family?: keyof DefaultTheme["typography"]["fontFamily"];
	margin?: Parameters<typeof mapMargin>[0];
	noWrap?: boolean;
	size?: keyof DefaultTheme["typography"]["fontSize"];
	weight?: keyof DefaultTheme["typography"]["fontWeight"];
}

export const Title = styled.h2<TitleProps>(
	({
		colourKey,
		family,
		margin,
		noWrap,
		size = "default",
		weight,
		theme: {
			colours,
			typography: { fontFamily, fontWeight },
		},
	}) => css`
		color: ${colourKey && colours[colourKey]};
		${mapFontSize(size)};
		font-family: ${fontFamily[family ?? "handwritten"]};
		font-weight: ${fontWeight[weight ?? "medium"]};
		margin: 0;
		${mapMargin(margin)};
		${noWrap && `white-space: nowrap;`};
	`
);
