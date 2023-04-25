import Link from "next/link";
import * as S from "./styles";

import { ProductFragment } from "lush/schema";
import Image from "next/image";
import { Pathname } from "lush/enums/pathname";
import { useRouter } from "next/router";

export const Product: React.FC<ProductFragment> = (props) => {
	const { name, slug, thumbnail, translation } = props;
	const { defaultLocale, locale } = useRouter();
	const isNotDefaultLocale = locale !== defaultLocale;

	const description = isNotDefaultLocale
		? translation?.description
		: props?.description;

	return (
		<S.Product>
			<Link
				href={{
					pathname: Pathname.Product,
					query: { slug },
				}}
			>
				{thumbnail && (
					<S.Image>
						<Image
							src={thumbnail?.url}
							alt={thumbnail?.alt || name}
							width={256}
							height={256}
						/>
					</S.Image>
				)}
				<S.Info>
					<S.Title>{name}</S.Title>
				</S.Info>
			</Link>
			<S.View>
				<Link
					href={{
						pathname: Pathname.Product,
						query: { slug },
					}}
				>
					View Product
				</Link>
			</S.View>
		</S.Product>
	);
};
