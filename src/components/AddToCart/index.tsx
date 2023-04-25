import { CartContext } from "lush/context/cart";
import { Translation } from "lush/enums";
import { ProductFragment } from "lush/schema";
import formatCurrency from "lush/utils/formatCurrency";
import { useTranslation } from "next-i18next";
import { FC, useContext } from "react";

interface AddToCartProps {
	product: ProductFragment;
}

export const AddToCart: FC<AddToCartProps> = ({ product }) => {
	const { addToCart, cart } = useContext(CartContext);
	const { t } = useTranslation(Translation.Common);

	const isProductInCart = cart.find(
		(cartItem) => cartItem.product.id === product.id
	);

	const price = product.pricing?.priceRangeUndiscounted?.stop;

	const translationKey = isProductInCart ? "addAnotherToCart" : "addToCart";

	if (!price?.gross?.amount) {
		return null;
	}

	return (
		<button
			onClick={() => {
				addToCart(product);
			}}
			type="button"
		>
			{t(isProductInCart ? "addAnotherToCart" : "addToCart", {
				price: formatCurrency(
					price?.gross?.amount,
					"en-GB",
					price?.gross?.currency
				),
			})}
		</button>
	);
};
