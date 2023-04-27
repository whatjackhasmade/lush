import { SpaceEnum } from "lush/theme/space";
import { css } from "styled-components";

interface SpaceOptions {
	top?: keyof typeof SpaceEnum;
	right?: keyof typeof SpaceEnum;
	bottom?: keyof typeof SpaceEnum;
	left?: keyof typeof SpaceEnum;
}

export const mapMargin = (margin?: SpaceOptions) => {
	if (!margin) return;

	const { top, right, bottom, left } = margin;

	return css`
		margin-top: ${top && SpaceEnum[top]};
		margin-right: ${right && SpaceEnum[right]};
		margin-bottom: ${bottom && SpaceEnum[bottom]};
		margin-left: ${left && SpaceEnum[left]};
	`;
};
