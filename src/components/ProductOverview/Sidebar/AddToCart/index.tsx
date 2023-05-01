import { Icon, Space, Text } from "lush/components";
import { ProductFragment } from "lush/schema";
import { FC, useEffect, useState } from "react";

import * as S from "./styles";
import { formatCurrency } from "lush/utils";
import { useTranslation } from "next-i18next";
import { Translation } from "lush/enums";
import { useCart } from "lush/hooks";

interface AddToCartProps {
	loading?: boolean;
	product?: ProductFragment | null;
	quantity: number;
	setQuantity: (quantity: number) => void;
}

export const AddToCart: FC<AddToCartProps> = ({
	loading,
	product,
	quantity,
	setQuantity,
}) => {
	const { t } = useTranslation(Translation.PageProduct);
	const [showAddedMessage, setShowAddedMessage] = useState(false);
	const { addToCart } = useCart();

	const gross = product?.pricing?.priceRange?.stop?.gross;

	useEffect(() => {
		if (showAddedMessage) {
			const timer = setTimeout(() => {
				setShowAddedMessage(false);
			}, 4000);

			return () => clearTimeout(timer);
		}
	}, [showAddedMessage]);

	return (
		<S.AddToCart
			disabled={loading || !gross || showAddedMessage}
			onClick={(event) => {
				event.preventDefault();

				if (product) {
					addToCart(product, quantity);
					setShowAddedMessage(true);
					setQuantity(1);
				}
			}}
			type="button"
		>
			<Icon.Bag />
			<Space
				margin={{
					left: "large",
				}}
			>
				<Text weight="medium" as="span">
					{showAddedMessage ? t("added") : t("addToBag")}
				</Text>
				{!loading && !showAddedMessage && gross && (
					<>
						<Text weight="medium" as="span" aria-hidden>
							{" "}
							-{" "}
						</Text>
						<Text weight="medium" as="span">
							{formatCurrency(gross.amount * quantity, "en-GB", gross.currency)}
						</Text>
					</>
				)}
			</Space>
		</S.AddToCart>
	);
};
