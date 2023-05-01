import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { Translation } from "lush/enums";
import { Error, Metadata, ProductOverview } from "lush/components";
import {
	LanguageCodeEnum,
	ProductDocument,
	ProductFragment,
} from "lush/schema";
import { useTranslation } from "next-i18next";
import { initializeApollo } from "lush/clients/apollo";

export default function ProductPage({
	error,
	product,
}: {
	error?: string;
	product: ProductFragment;
}) {
	const { t } = useTranslation(Translation.PageProduct);

	return (
		<>
			<Metadata
				title={product?.seoTitle || product?.name || t("seo.title")}
				description={product?.seoDescription}
			/>
			{error && <Error>{t(`${Translation.Common}:error.generic`)}</Error>}
			<ProductOverview product={product} />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	locale,
	params,
}) => {
	if (!locale || !params?.slug) return { notFound: true };

	const apolloClient = initializeApollo();

	const { data, error } = await apolloClient.query({
		query: ProductDocument,
		variables: {
			channel: "uk",
			language: LanguageCodeEnum.EN,
			slug: params.slug,
		},
	});

	try {
		return {
			props: {
				...(await serverSideTranslations(locale, [
					Translation.Common,
					Translation.PageProduct,
				])),
				product: data?.product,
				...(error && { error: error?.message }),
			},
		};
	} catch (translationError) {
		return { notFound: true };
	}
};
