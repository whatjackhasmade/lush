import { FC } from "react";

import { ProductFragment } from "lush/schema";
import * as S from "./styles";
import { AddToCart } from "../AddToCart";

interface ProductOverviewProps {
	product: ProductFragment;
}

export const ProductOverview: FC<ProductOverviewProps> = ({ product }) => {
	const { description, media } = product;
	const { blocks } = JSON.parse(description);
	const [featured, ...gallery] = media ?? [];

	return (
		<div>
			<S.Header>
				<div>
					<S.ImageFeatured src={featured?.url} alt={featured?.alt} />
					<h2>{product.name}</h2>
					<AddToCart product={product} />
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
			{blocks?.map((block) => (
				<p
					key={`product-description-${block.id}`}
					dangerouslySetInnerHTML={{ __html: block.data.text }}
				/>
			))}
		</div>
	);
};
