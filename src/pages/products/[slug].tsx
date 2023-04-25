import { useRouter } from "next/dist/client/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { Translation } from "lush/enums";
import { Error, Metadata, ProductOverview } from "lush/components";
import { useProductQuery } from "lush/schema";
import { languageCodeFromLocale } from "lush/utils";

type Query = {
	slug?: string;
};

export default function ProductPage() {
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
				title={product?.seoTitle || product?.name || "Product"}
				description={product?.seoDescription}
			/>
			{loading && <p>Loading...</p>}
			{error && <Error>Sorry, it looks like something went wrong</Error>}
			{product && <ProductOverview product={product} />}
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	if (!locale) return { notFound: true };

	try {
		return {
			props: await serverSideTranslations(locale, [
				Translation.Common,
				Translation.ComponentHeader,
			]),
		};
	} catch (error) {
		return { notFound: true };
	}
};
