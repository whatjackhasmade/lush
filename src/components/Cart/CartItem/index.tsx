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

export type CartItemProps = CartItemType;

export const CartItem: FC<CartItemProps> = ({ product, quantity }) => {
	const { isAvailableForPurchase, slug, thumbnail } = product;
	const { quantitySet, removeFromCart, pullout } = useCart();
	const { t } = useTranslation(Translation.Common);
	const gross = product?.pricing?.priceRange?.stop?.gross;

	const updateQuantity = (newQuantity: number) => {
		if (newQuantity < 1) {
			quantitySet({
				productId: product.id,
				quantity: 1,
			});
			return;
		}

		quantitySet({
			productId: product.id,
			quantity: newQuantity,
		});
	};

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
						onClick={() => {
							pullout.setIsOpen(false);
						}}
						href={{
							pathname: Pathname.Product,
							query: { slug },
						}}
					>
						<Title as="h3">{product.name}</Title>
					</Link>
					<Text>{product.category?.name}</Text>
				</S.Details>
				<S.Remove
					onClick={(event) => {
						event.preventDefault();
						removeFromCart(product.id);
					}}
					type="button"
				>
					<Icon.Trash />
					<VisuallyHidden>{t("remove")}</VisuallyHidden>
				</S.Remove>
			</S.Header>
			<S.Controls>
				<S.Quantity>
					<S.QuantityUpdate
						disabled={quantity <= 1}
						onClick={(event) => {
							event.preventDefault();
							updateQuantity(quantity - 1);
						}}
					>
						<VisuallyHidden>{t("quantityDecrease")}</VisuallyHidden>
						<span aria-hidden>-</span>
					</S.QuantityUpdate>
					{/* https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/ */}
					<VisuallyHidden>
						<label htmlFor="quantity">{t("quantity")}</label>
					</VisuallyHidden>
					<S.Input
						id="quantity"
						name="quantity"
						inputMode="numeric"
						pattern="[0-9]*"
						onKeyDown={(event) => {
							switch (event.key) {
								case "ArrowUp": {
									updateQuantity(quantity + 1);
									break;
								}
								case "ArrowDown": {
									updateQuantity(quantity - 1);
									break;
								}
								default: {
									break;
								}
							}
						}}
						onChange={(event) => {
							updateQuantity(+event.target.value);
						}}
						type="text"
						value={quantity}
					/>
					<S.QuantityUpdate
						onClick={(event) => {
							event.preventDefault();
							updateQuantity(quantity + 1);
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
							{t("cart.inStock")}
						</Text>
						<Text>{t("cart.onlineDelivery")}</Text>
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
							{t("cart.outOfStock")}
						</Text>
						<Text>{t("cart.restockSoon")}</Text>
					</>
				)}
			</S.Availability>
		</S.Item>
	);
};
