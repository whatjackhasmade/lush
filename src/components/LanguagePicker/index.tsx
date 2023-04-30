import { FC, useId } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Translation } from "lush/enums";
import { VisuallyHidden } from "..";

export const LanguagePicker: FC = () => {
	const id = useId();
	const { t } = useTranslation(Translation.Common);
	const { asPath, locale: currentLocale, locales, push } = useRouter();

	if (!locales?.length) return null;

	const labelledValues = locales.map((locale) => ({
		label: t(`language.${locale}`),
		value: locale,
	}));

	return (
		<>
			<VisuallyHidden>
				<label htmlFor={id}>{t("language.label")}</label>
			</VisuallyHidden>
			<select
				id={id}
				onChange={(event) => {
					push(asPath, asPath, { locale: event.target.value });
				}}
				value={currentLocale}
			>
				{labelledValues.map(({ label, value }) => (
					<option key={`language-selector-${value}`} value={value}>
						{label}
					</option>
				))}
			</select>
		</>
	);
};
