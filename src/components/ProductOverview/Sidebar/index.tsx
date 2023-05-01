import {
	Blocks,
	Skeleton,
	Space,
	Text,
	Title,
	VisuallyHidden,
} from "lush/components";
import { ProductFragment } from "lush/schema";
import { FC, useState } from "react";

import * as S from "./styles";
import { formatCurrency } from "lush/utils";
import { useTranslation } from "next-i18next";
import { Translation } from "lush/enums";
import Image from "next/image";
import { AddToCart } from "./AddToCart";

interface SidebarProps {
	loading?: boolean;
	product?: ProductFragment | null;
}

export const Sidebar: FC<SidebarProps> = ({ loading, product }) => {
	const { t } = useTranslation(Translation.PageProduct);
	const [quantity, setQuantity] = useState(1);

	const featuredImage = product?.thumbnail;
	const gross = product?.pricing?.priceRange?.stop?.gross;

	const updateQuantity = (newQuantity: number) => {
		if (newQuantity < 1) {
			setQuantity(1);
			return;
		}

		setQuantity(newQuantity);
	};

	return (
		<S.Sidebar>
			<S.Header>
				<S.ProductOverview>
					{loading ? (
						<Skeleton
							margin={{
								bottom: "small",
							}}
						/>
					) : (
						<Title
							as="h1"
							size="displayLarge"
							noWrap
							margin={{
								bottom: "small",
							}}
						>
							{product?.name}
						</Title>
					)}
					{loading ? (
						<Skeleton />
					) : (
						<Text
							as="span"
							colourKey="background"
							size="labelRegular"
							textTransform="uppercase"
						>
							{product?.category?.name}
						</Text>
					)}
					{loading ? (
						<Skeleton
							margin={{
								top: "xLarge",
							}}
						/>
					) : (
						<Blocks
							value={
								product?.attributes?.find(
									(attribute) => attribute.attribute?.slug === "strapline"
								)?.values[0]?.richText
							}
							text={{
								size: "labelLarge",
								margin: {
									top: "xLarge",
								},
							}}
						/>
					)}
				</S.ProductOverview>
				{loading && <Skeleton width="7rem" height="7rem" />}
				{!loading && featuredImage && (
					<Image
						alt={featuredImage?.alt ?? ""}
						src={featuredImage.url}
						width={160}
						height={160}
					/>
				)}
			</S.Header>
			<S.Quantity>
				<S.QuantityUpdate
					disabled={loading || quantity === 1}
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
					disabled={loading}
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
						const isNumber = /^[0-9]*$/.test(event.target.value);

						if (isNumber) updateQuantity(+event.target.value);
					}}
					type="text"
					value={quantity}
				/>
				<S.QuantityUpdate
					disabled={loading}
					onClick={(event) => {
						event.preventDefault();
						updateQuantity(quantity + 1);
					}}
				>
					<VisuallyHidden>{t("quantityIncrease")}</VisuallyHidden>
					<span aria-hidden>+</span>
				</S.QuantityUpdate>
			</S.Quantity>
			<Space
				margin={{
					bottom: "large",
					top: "xLarge",
				}}
			>
				{loading ? (
					<Skeleton width="8rem" />
				) : (
					<Text isBold>
						{!gross
							? String.fromCharCode(8211)
							: formatCurrency(gross?.amount, "en-GB", gross?.currency)}
					</Text>
				)}
			</Space>
			<AddToCart
				product={product}
				loading={loading}
				quantity={quantity}
				setQuantity={setQuantity}
			/>
		</S.Sidebar>
	);
};
