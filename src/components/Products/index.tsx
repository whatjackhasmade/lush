import { Error, VisuallyHidden } from "lush/components";
import {
	LanguageCodeEnum,
	ProductsQueryVariables,
	useProductsQuery,
} from "lush/schema";
import { Product } from "./Product";

import * as S from "./styles";
import { useRouter } from "next/router";

const languageCodeFromLocale = (locale = "") =>
	({
		["en"]: LanguageCodeEnum.EN,
		["fr"]: LanguageCodeEnum.FR,
	}[locale] || LanguageCodeEnum.EN);

export const Products: React.FC<{
	children?: React.ReactNode;
	variables?: ProductsQueryVariables;
}> = ({ children, variables }) => {
	const { locale } = useRouter();

	const { data, error, loading } = useProductsQuery({
		variables: {
			channel: "uk",
			first: 100,
			language: languageCodeFromLocale(locale),
			filter: {
				isAvailable: true,
				isPublished: true,
				isVisibleInListing: true,
			},
			...variables,
		},
	});

	return (
		<>
			{children}
			{/* TODO: Add skeleton state */}
			{loading && <p>Loading...</p>}
			{error && (
				<Error>
					Sorry, it looks like something went wrong with loading the products
				</Error>
			)}
			{!!data?.products?.edges?.length && (
				<>
					<VisuallyHidden>
						<h2>Products</h2>
					</VisuallyHidden>
					<S.Products>
						{data.products.edges.map(({ node }) => (
							<Product key={`product-listing-item-${node.id}`} product={node} />
						))}
					</S.Products>
				</>
			)}
		</>
	);
};
