import { FC } from "react";

import { ProductFragment } from "lush/schema";
import * as S from "./styles";
import { Blocks, Skeleton, Space } from "lush/components";
import { Gallery } from "./Gallery";
import { Sidebar } from "./Sidebar";

interface ProductOverviewProps {
	loading?: boolean;
	product?: ProductFragment | null;
}

export const ProductOverview: FC<ProductOverviewProps> = ({
	loading,
	product,
}) => (
	<S.Layout>
		<S.Right>
			<Sidebar product={product} loading={loading} />
		</S.Right>
		<S.Left>
			<Gallery product={product} loading={loading} />
			<Space
				margin={{
					top: "xxLarge",
				}}
			>
				{loading ? (
					<>
						{Array.from({ length: 6 }).map((_, index) => (
							<Skeleton
								key={`product-blocks-skeleton-${index}`}
								height="3rem"
								margin={{
									bottom: "small",
								}}
							/>
						))}
					</>
				) : (
					<Blocks value={product?.description} />
				)}
			</Space>
		</S.Left>
	</S.Layout>
);
