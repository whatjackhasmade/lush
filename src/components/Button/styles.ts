import styled, { css } from "styled-components";
import { ButtonProps } from "./types";
import { Variant } from "lush/enums";
import { hover } from "lush/utils";

export const Button = styled.button<Omit<ButtonProps, "children">>(
	({ theme, unstyled, variant = Variant.Primary }) =>
		!unstyled &&
		css`
			position: relative;
			display: inline-block;
			padding: ${theme.space.small} ${theme.space.large};
			overflow: hidden;
			color: ${{
				[Variant.Primary]: theme.colours.primary["100"],
				[Variant.Secondary]: theme.colours.secondary["900"],
			}[variant]};
			background-color: ${{
				[Variant.Primary]: theme.colours.primary["500"],
				[Variant.Secondary]: theme.colours.secondary["200"],
			}[variant]};
			border-radius: ${theme.space.large};

			${hover} {
				&:hover {
					background-color: ${{
						[Variant.Primary]: theme.colours.primary["400"],
						[Variant.Secondary]: theme.colours.secondary["400"],
					}[variant]};
				}
			}

			&:active {
				background-color: ${{
					[Variant.Primary]: theme.colours.primary["300"],
					[Variant.Secondary]: theme.colours.secondary["300"],
				}[variant]};
			}

			&:disabled {
				color: ${theme.colours.secondary};
				background-color: ${theme.colours.background["300"]};
				cursor: not-allowed;
			}

			&[aria-busy] {
				pointer-events: none;
			}
		`
);
