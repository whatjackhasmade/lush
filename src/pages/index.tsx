import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
	Filters,
	Metadata,
	Products,
	Hero,
	VisuallyHidden,
	Space,
} from "lush/components";
import { GetServerSideProps } from "next";
import { Translation } from "lush/enums";
import { FiltersProvider } from "lush/context";

import hero from "lush/assets/images/hero.jpeg";
import { useTranslation } from "next-i18next";

export default function HomePage() {
	const { t } = useTranslation(Translation.Common);

	return (
		<>
			<Metadata title="Home" />
			<Hero image={hero} title={t("hero.title")} />
			<FiltersProvider>
				<VisuallyHidden>
					<a href="#products">Skip to products</a>
				</VisuallyHidden>
				<Space
					margin={{
						top: "xxxLarge",
					}}
				>
					<Filters />
				</Space>
				<Products />
			</FiltersProvider>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	if (!locale) return { notFound: true };

	try {
		return {
			props: await serverSideTranslations(locale, [Translation.Common]),
		};
	} catch (error) {
		return { notFound: true };
	}
};
