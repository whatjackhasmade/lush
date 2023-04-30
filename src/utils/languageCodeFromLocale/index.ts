import { LanguageCodeEnum } from "lush/schema";

export const languageCodeFromLocale = (locale = "") =>
	({
		["en"]: LanguageCodeEnum.EN,
		["fr"]: LanguageCodeEnum.FR,
	}[locale] || LanguageCodeEnum.EN);
