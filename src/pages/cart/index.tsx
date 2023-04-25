import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CartOverview, Metadata } from "lush/components";
import { GetServerSideProps } from "next";
import { Translation } from "lush/enums";

export default function CartPage() {
	return (
		<>
			<Metadata title="Products" />
			<CartOverview />
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
