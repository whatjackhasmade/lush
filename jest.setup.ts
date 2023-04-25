/* eslint-disable import/no-extraneous-dependencies */
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import "jest-axe/extend-expect";
import { createContext } from "react";

jest.mock("next-i18next", () => ({
	useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock("next/dist/shared/lib/router-context.js", () => ({
	RouterContext: createContext(true),
}));
