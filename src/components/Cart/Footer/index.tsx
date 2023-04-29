import { Text } from "lush/components";
import { CheckoutButton } from "./CheckoutButton";

import * as S from "./styles";
import { useCart } from "lush/hooks";
import { formatCurrency } from "lush/utils";
import { Translation } from "lush/enums";
import { useTranslation } from "next-i18next";

export const CartFooter = () => {
	const { costTotal, costTotalRequiredForFreeDelivery, hasFreeDelivery } =
		useCart();
	const { t } = useTranslation(Translation.Common);

	return (
		<S.Footer>
			<S.Info>
				<S.Total>
					<Text isBold size="displayRegular">
						{t("cart.total")}
					</Text>
					<Text isBold size="displayRegular">
						{!costTotal?.currency
							? String.fromCharCode(8211)
							: formatCurrency(costTotal?.amount, "en-GB", costTotal?.currency)}
					</Text>
				</S.Total>
				<S.Delivery>
					<Text colourKey={hasFreeDelivery ? "success" : "warning"}>
						{hasFreeDelivery
							? t("cart.deliveryFree")
							: t("cart.deliveryNotFree", {
									amount: formatCurrency(
										costTotalRequiredForFreeDelivery - costTotal?.amount,
										"en-GB",
										costTotal?.currency
									),
							  })}
					</Text>
				</S.Delivery>
			</S.Info>
			<CheckoutButton />
		</S.Footer>
	);
};
