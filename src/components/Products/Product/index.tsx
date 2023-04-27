import Link from "next/link";
import * as S from "./styles";

import { ProductFragment } from "lush/schema";
import { Text, Title } from "lush/components";
import Image from "next/image";
import { Pathname } from "lush/enums/pathname";
import { useRouter } from "next/router";
import { CartContext } from "lush/context";
import { useContext } from "react";

export const Product: React.FC<{
	product: ProductFragment;
}> = ({ product }) => {
	const { name, slug, thumbnail, translation } = product;
	const { defaultLocale, locale } = useRouter();
	const isNotDefaultLocale = locale !== defaultLocale;
	const { addToCart, isInCart } = useContext(CartContext);

	const description = isNotDefaultLocale
		? translation?.description
		: product?.description;

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
					<Title as="h3">{name}</Title>
					<Text>TODO</Text>
				</S.Info>
			</Link>
			<S.View
				onClick={(event) => {
					event.preventDefault();
					addToCart(product);
				}}
			>
				{`${isInCart(product.id) ? "Add another" : "Add"} Product`}
			</S.View>
		</S.Product>
	);
};
