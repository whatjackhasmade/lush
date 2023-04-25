import { CartContext } from "lush/context";
import { FC, useContext } from "react";

import * as S from "./styles";
import Link from "next/link";
import { Translation } from "lush/enums";
import { useTranslation } from "next-i18next";
import { VisuallyHidden } from "../VisuallyHidden";

interface CartProps {}

const IconBag = () => (
	<svg viewBox="0 0 20 25" role="presentation">
		<path
			fill="currentColor"
			d="M2,22.5L3,8.3h2.2v3.4c0,0.5,0.4,0.8,0.9,0.8s0.9-0.4,0.9-0.8V8.3h6.5v3.4c0,0.5,0.4,0.8,0.9,0.8 c0.5,0,0.9-0.4,0.9-0.8V8.3h2.1l1,14.2H2z M6.8,5c0-1.7,1.4-3.1,3.2-3.1s3.2,1.4,3.2,3.1v1.7H6.8V5z M18.8,7.3L18.8,7.3L18.8,7.3 c0-0.5-0.4-0.8-0.9-0.8h-3V4.8C15,2.2,12.7,0,10,0C7.2,0,5,2.2,5,4.8v1.7H2c-0.4,0-0.8,0.3-0.9,0.8L0,23.3c0,0.2,0.1,0.4,0.2,0.6 c0.1,0.2,0.4,0.3,0.7,0.3h18.3c0.3,0,0.5-0.1,0.6-0.2c0.2-0.2,0.3-0.4,0.2-0.6L18.8,7.3z"
		></path>
	</svg>
);

export const Cart: FC<CartProps> = ({}) => {
	const { cart } = useContext(CartContext);
	const { t } = useTranslation(Translation.Common);

	return (
		<Link href="/cart" legacyBehavior passHref>
			<S.Cart>
				<IconBag />
				<VisuallyHidden>{t("cart")}</VisuallyHidden>
				{!!cart.length && (
					<S.Count>
						{cart.reduce((prev, current) => {
							return prev + current.quantity;
						}, 0)}
					</S.Count>
				)}
			</S.Cart>
		</Link>
	);
};
