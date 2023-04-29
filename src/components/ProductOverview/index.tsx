import { FC } from "react";

import { ProductFragment } from "lush/schema";
import * as S from "./styles";
import { AddToCart } from "../AddToCart";

interface ProductOverviewProps {
	loading?: boolean;
	product: ProductFragment;
}

const isBlocks = (
	blocks: unknown
): blocks is {
	id: string;
	data: {
		text: string;
	};
}[] => {
	if (!Array.isArray(blocks)) return false;

	return blocks.every((block) => {
		if (typeof block?.id !== "string") return false;
		if (typeof block?.data?.text !== "string") return false;
		return true;
	});
};

export const ProductOverview: FC<ProductOverviewProps> = ({
	loading,
	product,
}) => {
	const { description, media } = product;
	const { blocks } = JSON.parse(description);
	const parsedBlocks = isBlocks(blocks) ? blocks : [];

	const [featured, ...gallery] = media ?? [];

	return (
		<div>
			<S.Header>
				<div>
					<S.ImageFeatured src={featured?.url} alt={featured?.alt ?? ""} />
					<h2>{product.name}</h2>
					<AddToCart loading={loading} product={product} />
				</div>
				{!!gallery.length && (
					<S.Gallery>
						{gallery?.map((image) => (
							<S.GalleryItem key={`product-gallery-${image.id}`}>
								<img src={image.url} alt={image.alt} />
							</S.GalleryItem>
						))}
					</S.Gallery>
				)}
			</S.Header>
			{parsedBlocks?.map((block) => (
				<p
					key={`product-description-${block.id}`}
					dangerouslySetInnerHTML={{ __html: block.data.text }}
				/>
			))}
		</div>
	);
};
