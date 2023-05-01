import { FC } from "react";
import { ProductFragment } from "lush/schema";

import * as S from "./styles";
import { Skeleton } from "lush/components";

interface GalleryProps {
	loading?: boolean;
	product?: ProductFragment | null;
}

export const Gallery: FC<GalleryProps> = ({ loading, product }) => {
	const { media } = product ?? {};

	if (!loading && !media?.length) return null;

	return (
		<S.Gallery>
			{loading
				? Array.from({ length: 3 }).map((_, index) => (
						<S.Skeleton key={`product-gallery-skeleton-${index}`}>
							<Skeleton height="100%" />
						</S.Skeleton>
				  ))
				: media?.map((image) => (
						<S.GalleryItem key={`product-gallery-${image.id}`}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={image.url} alt={image.alt} />
						</S.GalleryItem>
				  ))}
		</S.Gallery>
	);
};
