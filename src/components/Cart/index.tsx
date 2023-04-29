import { useCart, useKeyPress } from "lush/hooks";
import { FC } from "react";

import * as S from "./styles";
import { CartContents } from "./CartContents";
import { useLockBodyScroll } from "lush/hooks";

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
