import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Filters, Metadata, Products } from "lush/components";
import { GetServerSideProps } from "next";
import { Translation } from "lush/enums";
import { FiltersProvider } from "lush/context";
import { FillMyCart } from "lush/components";

export default function HomePage() {
	return (
		<>
			<Metadata title="Home" />
			<FillMyCart />
			<FiltersProvider>
				<Filters />
				<Products />
			</FiltersProvider>
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
