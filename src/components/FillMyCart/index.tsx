import { LanguageCodeEnum, useProductsQuery } from "lush/schema";
import { Button } from "../Button";
import { useCart } from "lush/hooks";

export const FillMyCart = () => {
	const { addToCart } = useCart();

	const { data, error, loading } = useProductsQuery({
		variables: {
			channel: "uk",
			first: 100,
			language: LanguageCodeEnum.EN,
			filter: {
				isAvailable: true,
				isPublished: true,
				isVisibleInListing: true,
			},
		},
	});

	const products = data?.products?.edges?.map(({ node }) => node) ?? [];
	const randomSortProducts = products.sort(() => Math.random() - 0.5);

	return (
		<>
			<Button
				onClick={() => {
					const randomProducts = randomSortProducts.slice(
						0,
						Math.floor(Math.random() * 10)
					);

					randomProducts.forEach((product) => {
						addToCart(product);
					});
				}}
			>
				Fill my cart
			</Button>
		</>
	);
};
