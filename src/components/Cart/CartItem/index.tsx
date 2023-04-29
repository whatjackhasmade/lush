import { CartItem as CartItemType } from "lush/context";
import { useCart } from "lush/hooks";
import { FC } from "react";
import Image from "next/image";

import * as S from "./styles";
import { Pathname, Translation } from "lush/enums";
import { useTranslation } from "next-i18next";
import { Icon, Text, Title, VisuallyHidden } from "lush/components";
import { formatCurrency } from "lush/utils";
import Link from "next/link";

export const CartItem: FC<CartItemType> = ({ product, quantity }) => {
	const { isAvailableForPurchase, slug, thumbnail } = product;
	const { quantitySet, removeFromCart } = useCart();
	const { t } = useTranslation(Translation.Common);
	const gross = product?.pricing?.priceRangeUndiscounted?.stop?.gross;

	return (
		<S.Item key={product.id}>
			<S.Header>
				{thumbnail && (
					<S.Thumbnail>
						<Image
							src={thumbnail?.url}
							alt={thumbnail?.alt ?? ""}
							width={76}
							height={76}
						/>
					</S.Thumbnail>
				)}
				<S.Details>
					<Link
						href={{
							pathname: Pathname.Product,
							query: { slug },
						}}
					>
						<Title as="h3">{product.name}</Title>
					</Link>
					<Text>{product.category?.id}</Text>
				</S.Details>
				<S.Remove onClick={() => removeFromCart(product.id)} type="button">
					<Icon.Trash />
					<VisuallyHidden>{t("remove")}</VisuallyHidden>
				</S.Remove>
			</S.Header>
			<S.Controls>
				<S.Quantity>
					<S.QuantityUpdate
						onClick={() => {
							quantitySet({
								productId: product.id,
								quantity: quantity - 1,
							});
						}}
					>
						<VisuallyHidden>{t("quantityDecrease")}</VisuallyHidden>
						<span aria-hidden>-</span>
					</S.QuantityUpdate>
					<S.Input
						onKeyDown={(event) => {
							switch (event.key) {
								case "ArrowUp": {
									quantitySet({
										productId: product.id,
										quantity: quantity + 1,
									});

									break;
								}
								case "ArrowDown": {
									quantitySet({
										productId: product.id,
										quantity: quantity - 1,
									});

									break;
								}
								default: {
									break;
								}
							}
						}}
						onChange={(event) => {
							quantitySet({
								productId: product.id,
								quantity: +event.target.value,
							});
						}}
						type="text"
						value={quantity}
					/>
					<S.QuantityUpdate
						onClick={() => {
							quantitySet({
								productId: product.id,
								quantity: quantity + 1,
							});
						}}
					>
						<VisuallyHidden>{t("quantityIncrease")}</VisuallyHidden>
						<span aria-hidden>+</span>
					</S.QuantityUpdate>
				</S.Quantity>
				<Text>
					{!gross
						? String.fromCharCode(8211)
						: formatCurrency(gross?.amount, "en-GB", gross?.currency)}
				</Text>
			</S.Controls>
			<S.Availability>
				{!!isAvailableForPurchase ? (
					<>
						<S.AvailabilityIcon>
							<Icon.Tick />
						</S.AvailabilityIcon>
						<Text
							colourKey="success"
							margin={{
								right: "large",
							}}
						>
							{t("inStock")}
						</Text>
						<Text>{t("onlineDelivery")}</Text>
					</>
				) : (
					<>
						<S.AvailabilityIcon>
							<Icon.Times />
						</S.AvailabilityIcon>
						<Text
							colourKey="success"
							margin={{
								right: "large",
							}}
						>
							{t("outOfStock")}
						</Text>
						<Text>{t("restockSoon")}</Text>
					</>
				)}
			</S.Availability>
		</S.Item>
	);
};