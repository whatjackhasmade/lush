import { FC } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Translation } from "lush/enums";

export const LanguagePicker: FC = () => {
	const { t } = useTranslation(Translation.Common);
	const router = useRouter();
	const { locale: currentLocale, locales = ["en"], push } = router;

	const labelledValues = locales.map((locale) => ({
		label: t(`language.${locale}`),
		value: locale,
	}));

	return (
		<select
			onChange={(event) => {
				push(router.asPath, router.asPath, { locale: event.target.value });
			}}
			value={currentLocale}
		>
			{labelledValues?.map(({ label, value }) => (
				<option key={`language-selector-${value}`} value={value}>
					{label}
				</option>
			))}
		</select>
	);
};
