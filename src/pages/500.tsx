import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { ErrorHero, Metadata } from "lush/components";
import { Translation } from "lush/enums";

const ErrorPage: NextPage = () => {
	const { t } = useTranslation(Translation.PageError);

	return (
		<>
			<Metadata title={t("metadata.title")} />
			<ErrorHero description={t("description")} title={t("title")} />
		</>
	);
};

export default ErrorPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	if (!locale) return { notFound: true };

	try {
		return {
			props: await serverSideTranslations(locale, [
				Translation.Common,
				Translation.PageError,
			]),
		};
	} catch (error) {
		return { notFound: true };
	}
};
