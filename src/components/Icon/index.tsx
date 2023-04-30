import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import * as SVGs from "./svgs";
import * as S from "./styles";
import type { WrapperProps } from "./styles";

export interface IconProps
	extends ComponentPropsWithoutRef<"span">,
		WrapperProps {
	label?: string;
}

function withIconWrapper(WrappedIcon: React.ComponentType) {
	const WithIconWrapper = forwardRef<HTMLSpanElement, IconProps>(
		({ label, ...props }, ref) => (
			<S.Wrapper
				{...props}
				aria-hidden={!label}
				aria-label={label}
				ref={ref}
				role={label ? "img" : "presentation"}
			>
				<WrappedIcon />
			</S.Wrapper>
		)
	);

	WithIconWrapper.displayName = `Icon.${WrappedIcon.displayName ?? ""}`;
	return WithIconWrapper;
}

export const Icon = Object.entries(SVGs).reduce(
	(accumulator, [name, SVG]) => ({
		...accumulator,
		[name]: withIconWrapper(SVG),
	}),
	{} as {
		[key in keyof typeof SVGs]: ReturnType<typeof withIconWrapper>;
	}
);
