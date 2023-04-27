import { css, FlattenSimpleInterpolation } from "styled-components";

export function focus(
	focusStyles: FlattenSimpleInterpolation,
	undoFocusStyles: FlattenSimpleInterpolation
) {
	return css`
		/* Basic focus fallback to support IE and Safari */
		&:focus {
			${focusStyles}
		}

		@supports selector(:focus-visible) {
			/* Remove basic focus styles as focus-visible is supported */
			&:focus {
				${undoFocusStyles}
			}

			/* Apply focus-visible if supported */
			&:focus-visible {
				${focusStyles}
			}
		}
	`;
}
