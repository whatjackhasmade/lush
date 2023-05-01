import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { ErrorHero, Metadata } from "lush/components";
import { Pathname, Translation } from "lush/enums";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
	const { t } = useTranslation(Translation.PageNotFound);

	return (
		<>
			<Metadata title={t("metadata.title")} />
			<ErrorHero description={t("description")} title={t("title")}>
				<Link href={Pathname.Index}>{t("returnToHome")}</Link>
			</ErrorHero>
		</>
	);
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	if (!locale) return { notFound: true };

	try {
		return {
			props: await serverSideTranslations(locale, [
				Translation.Common,
				Translation.PageNotFound,
			]),
		};
	} catch (error) {
		return { notFound: true };
	}
};
