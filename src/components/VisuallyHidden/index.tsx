import * as React from "react";

import * as S from "./styles";

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLElement> {
	as?: "div" | "span";
	children?: React.ReactNode;
}

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
	as,
	children,
}) => <S.Wrapper as={as}>{children}</S.Wrapper>;
