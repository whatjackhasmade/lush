import { CartContext } from "lush/context";
import { FC, PropsWithChildren, useContext } from "react";

import * as S from "./styles";

export const CartOverview: FC<PropsWithChildren> = () => {
	const { cart, removeFromCart } = useContext(CartContext);

	return (
		<S.Wrapper>
			{!cart.length && <p>Your cart is empty</p>}
			{cart?.map(({ product, quantity }) => (
				<div key={`cart-item-${product.id}`}>
					<p>
						{product.name} x {quantity}
					</p>
					<button
						onClick={(event) => {
							event.preventDefault();
							removeFromCart(product);
						}}
						type="button"
					>
						Remove
					</button>
				</div>
			))}
		</S.Wrapper>
	);
};
