import { Error, VisuallyHidden } from "lush/components";
import { LanguageCodeEnum, useProductsQuery } from "lush/schema";
import { Product } from "./Product";

import * as S from "./styles";
import { useRouter } from "next/router";
import { useFilters } from "lush/hooks";
import { useTranslation } from "next-i18next";
import { Pagination, ToastId, Translation } from "lush/enums";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "lush/hooks";
import { toast } from "react-hot-toast";
import { deepMerge } from "lush/utils";

const languageCodeFromLocale = (locale = "") =>
	({
		["en"]: LanguageCodeEnum.EN,
		["fr"]: LanguageCodeEnum.FR,
	}[locale] || LanguageCodeEnum.EN);

export const Products: FC = () => {
	const [loadedMax, setLoadedMax] = useState(false);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const { locale } = useRouter();
	const { activeCategories } = useFilters();
	const { t } = useTranslation(Translation.Common);

	const { ref: refInfiniteScroll, isInView: infiniteScrollInView } =
		useInView();

	const variables = useMemo(() => {
		return {
			channel: "uk",
			first: Pagination.Limit,
			language: languageCodeFromLocale(locale),
			filter: {
				isAvailable: true,
				isPublished: true,
				isVisibleInListing: true,
				categories: activeCategories.map(({ id }) => id),
			},
		};
	}, [activeCategories, locale]);

	// Reset loadedMax when filters change to allow for new products to be fetched
	useEffect(() => {
		setLoadedMax(false);
	}, [variables]);

	const { data, error, fetchMore, loading } = useProductsQuery({
		variables,
	});

	const isLoading = !data && loading;
	const products = data?.products?.edges;

	const fetchMoreProducts = useCallback(() => {
		setIsFetchingMore(true);

		fetchMore({
			updateQuery: (previousResult, { fetchMoreResult }) => {
				if (!fetchMoreResult?.products) return previousResult;
				if (!previousResult?.products) return fetchMoreResult;

				if (!fetchMoreResult.products.edges.length) setLoadedMax(true);

				return deepMerge(previousResult, fetchMoreResult);
			},
			variables: {
				first: Pagination.Limit,
				after: products?.[products?.length - 1]?.cursor,
			},
		})
			.catch(() => {
				toast.error(
					<>
						{t("error.generic")}
						<button
							onClick={(event) => {
								event.preventDefault();
								toast.dismiss(ToastId.ProductsError);

								// Wait for the toast to be dismissed before fetching more products
								setTimeout(() => {
									fetchMoreProducts();
								}, 400);
							}}
						>
							{t("error.retry")}
						</button>
					</>,
					{
						id: ToastId.ProductsError,
					}
				);
			})
			.finally(() => {
				setIsFetchingMore(false);
			});
	}, [fetchMore, products, t]);

	useEffect(() => {
		if (!loadedMax && !isFetchingMore && infiniteScrollInView) {
			fetchMoreProducts();
		}
	}, [fetchMoreProducts, infiniteScrollInView, isFetchingMore, loadedMax]);

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
						<h2 id="products">{t("products.list.title")}</h2>
					</VisuallyHidden>
					<S.Products>
						{(products?.map(({ node }) => node) ?? []).map((product) => (
							<Product
								key={`product-listing-item-${product.id}`}
								isLoading={false}
								product={product}
							/>
						))}
						{(loading || isFetchingMore) &&
							Array.from({ length: Pagination.Limit }).map((_, index) => (
								<Product key={`product-skeleton-${index}`} isLoading />
							))}
						<div ref={refInfiniteScroll} />
					</S.Products>
				</>
			)}
		</div>
	);
};
