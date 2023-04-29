import { FC, useRef } from "react";
import FocusLock from "react-focus-lock";
import { useCart, useOnClickOutside, useReturnFocus } from "lush/hooks";

import * as S from "./styles";
import { Icon, Scrollbox, Text, Title, VisuallyHidden } from "lush/components";
import { CartItem } from "../CartItem";
import { CartFooter } from "../Footer";

export const CartContents: FC = () => {
	const { cart, count, pullout } = useCart();
	const refPullout = useRef<HTMLElement>(null);
	useReturnFocus();

	useOnClickOutside(refPullout, () => {
		pullout.setIsOpen(false);
	});

	return (
		<S.Cart ref={refPullout}>
			<S.Contents>
				<S.Header>
					<Title family="inter">Cart ({count})</Title>
					<S.Close
						onClick={(event) => {
							event.preventDefault();
							pullout.setIsOpen(false);
						}}
						type="button"
					>
						<VisuallyHidden>Close cart</VisuallyHidden>
						<Icon.Times />
					</S.Close>
				</S.Header>
				<S.Content>
					{!count && (
						<>
							<Title family="inter">Your bag is empty</Title>
							<Text>Sounds like a good time to start shopping!</Text>
						</>
					)}
					{!!cart.length && (
						<S.Items>
							{cart.map((item) => (
								<CartItem key={item.product.id} {...item} />
							))}
						</S.Items>
					)}
				</S.Content>
				<CartFooter />
			</S.Contents>
		</S.Cart>
	);
};
