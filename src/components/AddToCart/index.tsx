import { CartContext } from "lush/context/cart";
import { Translation } from "lush/enums";
import { ProductFragment } from "lush/schema";
import formatCurrency from "lush/utils/formatCurrency";
import { useTranslation } from "next-i18next";
import { FC, useContext } from "react";
import { Skeleton } from "../Skeleton";
import { Button } from "../Button";

interface AddToCartProps {
	loading?: boolean;
	product: ProductFragment;
}

export const AddToCart: FC<AddToCartProps> = ({ product, loading }) => {
	const { addToCart, cart } = useContext(CartContext);
	const { t } = useTranslation(Translation.Common);

	const gross = product.pricing?.priceRangeUndiscounted?.stop?.gross;

	return (
		<Button
			onClick={() => {
				addToCart(product);
			}}
		>
			{loading ? (
				<Skeleton />
			) : (
				<>
					{gross?.amount
						? t(
								cart.find((cartItem) => cartItem.product.id === product.id)
									? "addAnotherToCart"
									: "addToCart",
								{
									price: formatCurrency(
										gross?.amount,
										"en-GB",
										gross?.currency
									),
								}
						  )
						: t("unavailable")}
				</>
			)}
		</Button>
	);
};
