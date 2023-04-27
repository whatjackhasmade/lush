import { FC } from "react";

import * as S from "./styles";
import { ButtonProps } from "./types";

export const Button: FC<ButtonProps> = ({
	children,
	disabled,
	isLoading,
	onClick,
	type = "button",
	...rest
}) => (
	<S.Button
		{...rest}
		disabled={disabled || isLoading}
		onClick={(event) => {
			event.preventDefault();
			onClick(event);
		}}
		type={type}
	>
		{children}
	</S.Button>
);
