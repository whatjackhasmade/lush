import { FC, PropsWithChildren } from "react";

import * as S from "./styles";
import { useFilters } from "lush/hooks/useFilters";
import { useCategoriesQuery } from "lush/schema";
import { Skeleton } from "lush/components";

export const Filters: FC<PropsWithChildren> = ({ children }) => {
	const { activeCategories, toggleCategory, clearAllCategories } = useFilters();

	const { data, error, loading } = useCategoriesQuery({
		variables: {
			first: 100,
		},
	});

	const categories = data?.categories?.edges?.map(({ node }) => node) ?? [];
	const isLoading = !data && loading;
	// const isLoading = true;

	return (
		<S.Filters>
			{error && <p>Sorry, it looks like something went wrong</p>}
			<>
				<S.Header>
					<h2>Filter our products by category</h2>
					<S.Category
						as="button"
						disabled={isLoading || !activeCategories.length}
						isFull
						onClick={() => {
							clearAllCategories();
						}}
					>
						Clear all categories
					</S.Category>
				</S.Header>
				<S.Categories>
					{isLoading &&
						Array.from({ length: 36 }).map((_, index) => (
							<S.Skeleton key={index}>
								<Skeleton />
							</S.Skeleton>
						))}
					{!isLoading &&
						categories?.map((category) => {
							const isActive = activeCategories.some(
								(activeCategory) => activeCategory.id === category.id
							);

							return (
								<>
									<S.Input
										id={`category-${category.id}`}
										name="category"
										type="checkbox"
										checked={isActive}
										onChange={(event) => {
											event.preventDefault();
											toggleCategory(category);
										}}
									/>
									<S.Category
										isActive={isActive}
										key={category.id}
										htmlFor={`category-${category.id}`}
									>
										{category.name}
									</S.Category>
								</>
							);
						})}
				</S.Categories>
			</>
		</S.Filters>
	);
};
