import Link from "next/link";
import * as S from "./styles";

import { ProductFragment } from "lush/schema";
import { Text, Title } from "lush/components";
import Image from "next/image";
import { Pathname } from "lush/enums/pathname";
import { useCart } from "lush/hooks";

export const Product: React.FC<{
	product: ProductFragment;
}> = ({ product }) => {
	const { name, slug, thumbnail } = product;
	const { addToCart, isInCart } = useCart();

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
					{/* TODO: Add metadata */}
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
