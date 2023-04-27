import { DefaultTheme, css } from "styled-components";
import { above } from "lush/utils";

export const mapFontSize = (
	size?: keyof DefaultTheme["typography"]["fontSize"]
) =>
	!size
		? undefined
		: css`
				font-size: ${({ theme }) => theme.typography.fontSize[size].mobile};

				${above.desktopSmall} {
					font-size: ${({ theme }) => theme.typography.fontSize[size].desktop};
				}
		  `;
