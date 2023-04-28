import { useCart } from "lush/hooks";
import { Translation } from "lush/enums";
import { ProductFragment } from "lush/schema";
import formatCurrency from "lush/utils/formatCurrency";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { Button, Skeleton } from "lush/components";

export interface AddToCartProps {
	loading?: boolean;
	product?: ProductFragment;
}

export const AddToCart: FC<AddToCartProps> = ({ product, loading }) => {
	const { addToCart, cart } = useCart();
	const { t } = useTranslation(Translation.Common);

	const gross = product?.pricing?.priceRangeUndiscounted?.stop?.gross;

	return (
		<Button
			disabled={loading || !gross?.amount}
			onClick={() => {
				if (product) addToCart(product);
			}}
		>
			{loading ? (
				<Skeleton />
			) : (
				<>
					{product && gross?.amount
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
