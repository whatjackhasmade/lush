import { useCart } from "lush/hooks";
import { FC, useRef, useState } from "react";

import * as S from "./styles";
import { Translation } from "lush/enums";
import { useTranslation } from "next-i18next";
import { Text, Title, VisuallyHidden } from "lush/components";
import useOnClickOutside from "lush/hooks/useOnClickOutside";
import { CartItem } from "./CartItem";

interface CartProps {}

const IconBag = () => (
	<svg viewBox="0 0 20 25" role="presentation">
		<path
			fill="currentColor"
			d="M2,22.5L3,8.3h2.2v3.4c0,0.5,0.4,0.8,0.9,0.8s0.9-0.4,0.9-0.8V8.3h6.5v3.4c0,0.5,0.4,0.8,0.9,0.8 c0.5,0,0.9-0.4,0.9-0.8V8.3h2.1l1,14.2H2z M6.8,5c0-1.7,1.4-3.1,3.2-3.1s3.2,1.4,3.2,3.1v1.7H6.8V5z M18.8,7.3L18.8,7.3L18.8,7.3 c0-0.5-0.4-0.8-0.9-0.8h-3V4.8C15,2.2,12.7,0,10,0C7.2,0,5,2.2,5,4.8v1.7H2c-0.4,0-0.8,0.3-0.9,0.8L0,23.3c0,0.2,0.1,0.4,0.2,0.6 c0.1,0.2,0.4,0.3,0.7,0.3h18.3c0.3,0,0.5-0.1,0.6-0.2c0.2-0.2,0.3-0.4,0.2-0.6L18.8,7.3z"
		></path>
	</svg>
);

export const Cart: FC<CartProps> = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { cart, count } = useCart();
	const { t } = useTranslation(Translation.Common);
	const ref = useRef<HTMLElement>(null);

	useOnClickOutside(ref, () => {
		if (isOpen) setIsOpen(false);
	});

	return (
		<>
			<S.Toggle
				aria-checked={isOpen}
				onClick={(event) => {
					event.preventDefault();
					setIsOpen(!isOpen);
				}}
				role="switch"
				type="button"
			>
				<IconBag />
				<VisuallyHidden>{t("cart")}</VisuallyHidden>
				{!!count && <S.Count>{count}</S.Count>}
			</S.Toggle>
			<S.Cart isOpen={isOpen} ref={ref}>
				<S.Header>
					<Title family="inter">Cart ({count})</Title>
					<S.Close
						onClick={(event) => {
							event.preventDefault();
							setIsOpen(false);
						}}
					>
						X<VisuallyHidden>Close cart</VisuallyHidden>
					</S.Close>
				</S.Header>
				{!count && (
					<>
						<Title family="inter">Your bag is empty</Title>
						<Text>Sounds like a good time to start shopping!</Text>
					</>
				)}
				{cart.map((item) => (
					<CartItem key={item.product.id} {...item} />
				))}
			</S.Cart>
			{isOpen && <S.Overlay />}
		</>
	);
};
