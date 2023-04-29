import { Error, VisuallyHidden } from "lush/components";
import { LanguageCodeEnum, useProductsQuery } from "lush/schema";
import { Product } from "./Product";

import * as S from "./styles";
import { useRouter } from "next/router";
import { useFilters } from "lush/hooks";
import { useTranslation } from "next-i18next";
import { Pagination, Translation } from "lush/enums";
import { FC } from "react";

const languageCodeFromLocale = (locale = "") =>
	({
		["en"]: LanguageCodeEnum.EN,
		["fr"]: LanguageCodeEnum.FR,
	}[locale] || LanguageCodeEnum.EN);

export const Products: FC = () => {
	const { locale } = useRouter();
	const { activeCategories } = useFilters();
	const { t } = useTranslation(Translation.Common);

	const { data, error, loading } = useProductsQuery({
		variables: {
			channel: "uk",
			first: Pagination.Limit,
			language: languageCodeFromLocale(locale),
			filter: {
				isAvailable: true,
				isPublished: true,
				isVisibleInListing: true,
				categories: activeCategories.map(({ id }) => id),
			},
		},
	});

	const isLoading = !data && loading;
	const products = data?.products?.edges?.map(({ node }) => node) ?? [];

	return (
		<div id="products">
			{isLoading && (
				<>
					<VisuallyHidden>
						<h2>{t("products.loading.title")}</h2>
					</VisuallyHidden>
					<S.Products>
						{Array.from({ length: Pagination.Limit }).map((_, index) => (
							<Product key={`product-skeleton-${index}`} isLoading />
						))}
					</S.Products>
				</>
			)}
			{error && <Error>{t("error.generic")}</Error>}
			{!!products?.length && (
				<>
					<VisuallyHidden>
						<h2>{t("products.list.title")}</h2>
					</VisuallyHidden>
					<S.Products>
						{products.map((product) => (
							<Product
								key={`product-listing-item-${product.id}`}
								isLoading={false}
								product={product}
							/>
						))}
					</S.Products>
				</>
			)}
		</div>
	);
};
