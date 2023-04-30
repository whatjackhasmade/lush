import { renderWithTheme } from "../../../.jest";
import { ErrorHero } from ".";

describe("ErrorHero", () => {
	it("renders the children", () => {
		const { getByText } = renderWithTheme(<ErrorHero>Test</ErrorHero>);
		expect(getByText("Test")).toBeInTheDocument();
	});
});
