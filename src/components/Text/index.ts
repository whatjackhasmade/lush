import styled, { css } from "styled-components";
import type { DefaultTheme } from "styled-components";
import { mapMargin } from "lush/utils";
import { mapFontSize } from "lush/utils/mapFontSize";
import { Property } from "csstype";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
	colourKey?: keyof DefaultTheme["colours"];
	isBold?: boolean;
	margin?: Parameters<typeof mapMargin>[0];
	size?: keyof DefaultTheme["typography"]["fontSize"];
	textTransform?: Property.TextTransform;
	weight?: keyof DefaultTheme["typography"]["fontWeight"];
}

export const Text = styled.p<TextProps>(
	({
		colourKey,
		isBold,
		margin,
		size,
		textTransform,
		weight,
		theme: {
			colours,
			typography: { fontWeight },
		},
	}) => css`
		color: ${colourKey && colours[colourKey]["600"]};
		${mapFontSize(size)};
		font-weight: ${isBold && fontWeight.bold};
		font-weight: ${weight && fontWeight[weight]};
		${mapMargin(margin)};
		text-transform: ${textTransform};
	`
);
