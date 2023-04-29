import { FC } from "react";
import { useCart, useLockBodyScroll, useKeyPress } from "lush/hooks";

import * as S from "./styles";
import { CartContents } from "./CartContents";

export const Cart: FC = () => {
	const { pullout } = useCart();

	useLockBodyScroll();

	useKeyPress("Escape", () => {
		pullout.setIsOpen(false);
	});

	return (
		<>
			<CartContents />
			<S.Overlay />
		</>
	);
};
