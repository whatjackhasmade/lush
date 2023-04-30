import { LanguageCodeEnum } from "lush/schema";
import { languageCodeFromLocale } from ".";

describe("languageCodeFromLocale", () => {
	it("should return EN for empty or unknown locales", () => {
		expect(languageCodeFromLocale()).toEqual(LanguageCodeEnum.EN);
		expect(languageCodeFromLocale("unknown")).toEqual(LanguageCodeEnum.EN);
	});

	it("should return the correct language code for a given locale", () => {
		expect(languageCodeFromLocale("en")).toEqual(LanguageCodeEnum.EN);
		expect(languageCodeFromLocale("fr")).toEqual(LanguageCodeEnum.FR);
	});
});
