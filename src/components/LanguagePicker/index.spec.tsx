import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../.jest";
import { useRouter } from "next/router";

import { LanguagePicker } from ".";

const user = userEvent.setup();

const mockPush = jest.fn();

jest.mock("next/router", () => ({
	useRouter: jest.fn(() => ({
		asPath: "/",
		locale: "en",
		locales: ["en", "de"],
		push: mockPush,
	})),
}));

describe("LanguagePicker", () => {
	it("should render select with locales as options", () => {
		const { getByRole, getAllByRole } = renderWithTheme(<LanguagePicker />);

		const select = getByRole("combobox", {
			name: "language.label",
		});

		expect(select).toBeInTheDocument();

		const options = getAllByRole("option");
		expect(options).toHaveLength(2);
	});

	it("should not render when no locales are defined", () => {
		(useRouter as jest.Mock).mockReturnValueOnce({
			asPath: "/",
			locale: "en",
			push: jest.fn(),
		});

		const { queryByRole } = renderWithTheme(<LanguagePicker />);

		expect(queryByRole("combobox")).not.toBeInTheDocument();
	});

	it("calls push with new locale when select value changes", async () => {
		const { getByRole } = renderWithTheme(<LanguagePicker />);

		const select = getByRole("combobox", {
			name: "language.label",
		});
		expect(select).toBeInTheDocument();

		const optionDe = getByRole("option", {
			name: "language.de",
		}) as HTMLOptionElement;
		expect(optionDe).toBeInTheDocument();

		const optionEn = getByRole("option", {
			name: "language.en",
		}) as HTMLOptionElement;
		expect(optionEn).toBeInTheDocument();

		await userEvent.tab();

		expect(select).toHaveFocus();

		await user.selectOptions(select, optionDe);

		expect(mockPush).toHaveBeenCalledWith("/", "/", { locale: "de" });
	});
});
