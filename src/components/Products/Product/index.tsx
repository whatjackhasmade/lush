import { FC, useEffect, useState } from "react";
import Link from "next/link";
import * as S from "./styles";

import { ProductFragment } from "lush/schema";
import { Skeleton, Text, Title } from "lush/components";
import Image from "next/image";
import { Pathname } from "lush/enums/pathname";
import { useCart } from "lush/hooks";
import { useTranslation } from "next-i18next";
import { Translation } from "lush/enums";
import { formatCurrency } from "lush/utils";

type ProductProps =
	| {
			product: ProductFragment;
			isLoading?: false;
	  }
	| {
			product?: undefined;
			isLoading: true;
	  };

export const Product: FC<ProductProps> = ({ product, isLoading }) => {
	const { t } = useTranslation(Translation.Common);
	const { addToCart, isInCart } = useCart();
	const [showAddedMessage, setShowAddedMessage] = useState(false);

	useEffect(() => {
		if (showAddedMessage) {
			const timer = setTimeout(() => {
				setShowAddedMessage(false);
			}, 4000);

			return () => clearTimeout(timer);
		}
	}, [showAddedMessage]);

	if (isLoading) return <Skeleton height="256px" width="256px" />;

	const { category, seoDescription, name, slug, thumbnail } = product;
	const gross = product?.pricing?.priceRange?.stop?.gross;

	return (
		<S.Product>
			<Link
				href={{
					pathname: Pathname.Product,
					query: { slug },
				}}
			>
				{thumbnail && (
					<S.Image>
						<Image
							src={thumbnail?.url}
							alt={thumbnail?.alt ?? ""}
							width={256}
							height={256}
						/>
					</S.Image>
				)}
				<S.Info>
					<Title
						as="h3"
						margin={{
							bottom: "regular",
						}}
					>
						{name}
					</Title>
					<Text
						size="labelSmall"
						margin={{
							bottom: "small",
						}}
					>
						{category?.name}
					</Text>
					<Text size="labelSmall">{seoDescription}</Text>
					{!!gross?.amount && (
						<Text
							size="labelLarge"
							isBold
							margin={{
								top: "small",
							}}
						>
							{formatCurrency(gross?.amount, "en-GB", gross?.currency)}
						</Text>
					)}
				</S.Info>
			</Link>
			<S.View
				onClick={(event) => {
					if (!product) return;

					event.preventDefault();
					addToCart(product);
					setShowAddedMessage(true);
				}}
			>
				{showAddedMessage
					? t("product.added")
					: t(`product.${isInCart(product.id) ? "addAnother" : "add"}`)}
			</S.View>
		</S.Product>
	);
};
