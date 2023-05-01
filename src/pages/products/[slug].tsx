import { useRouter } from "next/dist/client/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { Translation } from "lush/enums";
import { Error, Metadata, ProductOverview } from "lush/components";
import { useProductQuery } from "lush/schema";
import { languageCodeFromLocale } from "lush/utils";
import { useTranslation } from "next-i18next";

type Query = {
	slug?: string;
};

export default function ProductPage() {
	const { t } = useTranslation(Translation.PageProduct);
	const { locale, query } = useRouter();
	const { slug = "" } = (query ?? {}) as Query;
	const language = languageCodeFromLocale(locale);

	const { data, error, loading } = useProductQuery({
		variables: {
			channel: "uk",
			language,
			slug,
		},
	});

	const { product } = data ?? {};

	return (
		<>
			<Metadata
				title={product?.seoTitle || product?.name || t("seo.title")}
				description={product?.seoDescription}
			/>
			{error && <Error>{t(`${Translation.Common}:error.generic`)}</Error>}
			<ProductOverview product={product} loading={loading} />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	if (!locale) return { notFound: true };

	try {
		return {
			props: await serverSideTranslations(locale, [
				Translation.Common,
				Translation.PageProduct,
			]),
		};
	} catch (error) {
		return { notFound: true };
	}
};
