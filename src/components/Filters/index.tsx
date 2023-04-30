import { Fragment, FC } from "react";
import { useTranslation } from "next-i18next";

import * as S from "./styles";
import { useFilters } from "lush/hooks";
import { useCategoriesQuery } from "lush/schema";
import { Error, Skeleton, Title } from "lush/components";
import { Translation } from "lush/enums";

export const Filters: FC = () => {
	const { t } = useTranslation(Translation.Common);
	const { activeCategories, toggleCategory } = useFilters();

	const { data, error, loading } = useCategoriesQuery({
		variables: {
			first: 100,
		},
	});

	const categories = data?.categories?.edges?.map(({ node }) => node) ?? [];

	const isLoading = !data && loading;

	return (
		<S.Filters>
			<S.Header>
				<Title family="inter">{t("filters.title")}</Title>
			</S.Header>
			{error && <Error>{t("error.generic")}</Error>}
			{!loading && !error && !categories.length && (
				<Error>{t("error.noCategories")}</Error>
			)}
			{(isLoading || !!categories.length) && (
				<S.Categories>
					{isLoading &&
						Array.from({ length: 36 }).map((_, index) => (
							<Skeleton
								key={`category-skeleton-${index}`}
								height="2.4rem"
								width="7rem"
							/>
						))}
					{!isLoading &&
						categories.map((category) => {
							const isActive = activeCategories.some(
								(activeCategory) => activeCategory.id === category.id
							);

							return (
								<Fragment key={`category-option-${category.id}`}>
									<S.Input
										id={`category-option-${category.id}`}
										name="category"
										type="checkbox"
										checked={isActive}
										onChange={() => {
											toggleCategory(category);
										}}
									/>
									<S.Category
										isActive={isActive}
										key={category.id}
										htmlFor={`category-option-${category.id}`}
									>
										{category.name}
									</S.Category>
								</Fragment>
							);
						})}
				</S.Categories>
			)}
		</S.Filters>
	);
};
